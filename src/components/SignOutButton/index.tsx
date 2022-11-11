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
