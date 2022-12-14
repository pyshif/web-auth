import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScript from 'hooks/useScript';
import { useAppDispatch } from 'store';
import { apiGoogleSignIn } from 'store/features/authSlice';
import { message } from 'antd';
import routes from 'utils/routes';
import { CredentialResponse } from 'google-one-tap';

// GSI JavaScript API Reference
// https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
// GSI Popup mode setup
// https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy

// Credential
// 
// header
// {
//   "alg": "RS256",
//   "kid": "f05415b13acb9590f70df862765c655f5a7a019e", // JWT signature
//   "typ": "JWT"
// }
// payload
// {
//   "iss": "https://accounts.google.com", // The JWT's issuer
//   "nbf":  161803398874,
//   "aud": "314159265-pi.apps.googleusercontent.com", // Your server's client ID
//   "sub": "3141592653589793238", // The unique ID of the user's Google Account
//   "hd": "gmail.com", // If present, the host domain of the user's GSuite email address
//   "email": "elisa.g.beckett@gmail.com", // The user's email address
//   "email_verified": true, // true, if Google has verified the email address
//   "azp": "314159265-pi.apps.googleusercontent.com",
//   "name": "Elisa Beckett",
//                             // If present, a URL to user's profile picture
//   "picture": "https://lh3.googleusercontent.com/a-/e2718281828459045235360uler",
//   "given_name": "Elisa",
//   "family_name": "Beckett",
//   "iat": 1596474000, // Unix timestamp of the assertion's creation time
//   "exp": 1596477600, // Unix timestamp of the assertion's expiration time
//   "jti": "abc161803398874def"
// }

declare namespace window {
    let onGoogleLibraryLoad: () => void;
}

// popup mode
function useGSI() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useScript(process.env.GOOGLE_GSI_SRC as string);

    const handleResponse = (user: CredentialResponse) => {
        // console.log('user :>> ', user);
        // const decodeJWT = import('jwt-decode');
        // console.log('user.credential :>> ', user.credential);
        // console.log('decodeJWT(user.credential) :>> ', decodeJWT(user.credential));
        const hide = message.loading('Google sign-in in progress...', 0);
        dispatch(apiGoogleSignIn(user.credential)).then((action) => {
            const { error } = action as any;
            if (error) {
                message.error('Google sign-in failed!', 3);
                return hide();
            }
            message.success('Google sign-in success!', 3);
            navigate(routes.user);
            return hide();
        });
    }

    useEffect(() => {
        // console.log('state :>> ', state);
        if (state.status === 'succeeded') {
            google.accounts.id.initialize({
                client_id: process.env.GOOGLE_GSI_CLIENT_ID as string,
                callback: handleResponse,
                ux_mode: 'popup',
                auto_select: true,
            });

            const gsiBtn = document.querySelector('#gsi-btn') as HTMLElement;
            google.accounts.id.renderButton(gsiBtn, {
                type: 'standard',
                size: 'large',
                width: 278,
                theme: 'outline',
                text: 'signin_with',
                logo_alignment: 'center',
                locale: 'en',
            });

            // const gsiIframe = document.querySelector('#gsi-btn iframe') as HTMLIFrameElement;
            // console.log('gsiIframe :>> ', gsiIframe);
            // gsiIframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-forms allow-same-origin');
            // gsiIframe.setAttribute('referrerpolicy', 'origin-when-cross-origin');
        }
    }, [state]);
}

// redirect mode
// import apiRoutes from 'api/v1/routes';
// function useGSI() {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const state = useScript(process.env.GOOGLE_GSI_SRC as string);

//     const handleResponse = (user: CredentialResponse) => {
//         // console.log('user :>> ', user);
//         // console.log('user.credential :>> ', user.credential);
//         // console.log('decodeJWT(user.credential) :>> ', decodeJWT(user.credential));
//         const hide = message.loading('Google sign-in in progress...', 0);
//         dispatch(apiGoogleSignIn(user.credential)).then((action) => {
//             const { error } = action as any;
//             if (error) {
//                 message.error('Google sign-in failed!', 3);
//                 return hide();
//             }
//             message.success('Google sign-in success!', 3);
//             navigate(routes.user);
//             return hide();
//         });
//     }

//     useEffect(() => {
//         // console.log('state :>> ', state);
//         let login_uri = process.env.API_URL + apiRoutes.auth.google.redirect.POST;
//         login_uri = login_uri.slice(0, login_uri.length - 1);
//         console.log('login_uri :>> ', login_uri);

//         if (state.status === 'succeeded') {
//             google.accounts.id.initialize({
//                 client_id: process.env.GOOGLE_GSI_CLIENT_ID as string,
//                 callback: handleResponse,
//                 ux_mode: 'redirect',
//                 login_uri: login_uri,
//                 auto_select: true,
//             });

//             const gsiBtn = document.querySelector('#gsi-btn') as HTMLElement;
//             google.accounts.id.renderButton(gsiBtn, {
//                 type: 'standard',
//                 size: 'large',
//                 width: 278,
//                 theme: 'outline',
//                 text: 'signin_with',
//                 logo_alignment: 'center',
//                 locale: 'en',
//             });
//         }
//     }, [state]);
// }

export default useGSI;