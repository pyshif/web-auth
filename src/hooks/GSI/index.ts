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

// google.accounts.id.disableAutoSelect();

declare namespace window {
    let onGoogleLibraryLoad: () => void;
}

function useGSI() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useScript(process.env.GOOGLE_GSI_SRC as string);

    const handleResponse = (user: CredentialResponse) => {
        // console.log('user :>> ', user);
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
        }
    }, [state]);
}

export default useGSI;