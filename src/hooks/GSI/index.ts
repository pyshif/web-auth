import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScript from 'hooks/useScript';
import { useAppDispatch } from 'store';
import { apiGoogleSignIn } from 'store/features/authSlice';
import { message } from 'antd';
import routes from 'utils/routes';

function useGSI() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useScript(process.env.GOOGLE_GSI_SRC as string);

    const requestCredential = (user: any) => {

        const hide = message.loading('Google sign-in in progress...', 0);
        dispatch(apiGoogleSignIn(user.credential)).then((action) => {
            const { error } = action as unknown as any;
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
        if (state.status === 'succeeded') {
            google.accounts.id.initialize({
                client_id: process.env.GOOGLE_GSI_CLIENT_ID,
                callback: requestCredential,
                ux_mode: 'popup',
                auto_select: true,
            })
        }
    }, [state]);
}

export default useGSI;