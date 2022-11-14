import IconButton from 'components/IconButton';
import { useAppDispatch, useAppSelector } from 'store';
import { apiSignOut, apiGoogleSignOut } from 'store/features/authSlice';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import routes from 'utils/routes';
import { ComponentProps } from 'react';

type PropsSignOutButton = Partial<ComponentProps<typeof IconButton>>;

function SignOutButton(props: PropsSignOutButton) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.auth);

    const handleSignOut = () => {
        // disable and revoke google id token
        // console.log('user :>> ', user);
        dispatch(apiGoogleSignOut(user.email));
        // sign out
        const hide = message.loading('Sign-out in progress...', 0);
        dispatch(apiSignOut()).then((action) => {
            const { error } = action as unknown as any;
            if (error) {
                message.error('Sign-out failed!', 3);
                return hide();
            }
            message.success('Sign-out successful!', 3);
            navigate(routes.home);
            return hide();
        });
    };

    const { style, ...rest } = props;
    const css = token === '' ? { display: 'none' } : { ...style };
    // console.log('css :>> ', css);

    return (
        <IconButton
            icon="right-from-bracket"
            onClick={handleSignOut}
            style={css}
            {...rest}
        />
    );
}

export default SignOutButton;
