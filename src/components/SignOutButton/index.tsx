import IconButton from 'components/IconButton';
import { useAppDispatch, useAppSelector } from 'store';
import { apiSignOut } from 'store/features/authSlice';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import routes from 'utils/routes';
import { useCallback, ComponentProps } from 'react';

type PropsSignOutButton = Partial<ComponentProps<typeof IconButton>>;

function SignOutButton(props: PropsSignOutButton) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    const handleSignOut = useCallback(() => {
        const hide = message.loading('Sign-out in progress...', 0);
        dispatch(apiSignOut())
            .then(() => {
                message.success('Sign-out successful!');
                hide();
                navigate(routes.home);
            })
            .catch((error) => {
                message.error('Sign-out failed! Error: ' + error.message);
                hide();
            });
    }, []);

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
