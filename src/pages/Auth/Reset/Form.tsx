import styled from 'styled-components';
import Sep from 'components/Sep';
import { useNavigate } from 'react-router-dom';
import { Form as F, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
    apiResetPassword,
    apiResetPasswordByLink,
    apiSignOut,
} from 'store/features/authSlice';
import Link from 'components/Link';
import routes from 'utils/routes';

const ResetForm = styled(F)`
    width: 100%;
    max-width: 360px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 0.5rem;
    padding: 2.875rem 2.5rem;
    margin: auto;
`;

const SubmitButton = styled(Button).attrs({
    htmlType: 'submit',
})`
    width: 100%;
`;

type PropsForm = {
    resetId: string;
};

function Form(props: PropsForm) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    const { resetId } = props;

    async function onFinish(values: any) {
        // console.log('values :>> ', values);
        const { newPassword, confirmPassword } = values;

        // reset password by access-token
        if (!resetId) {
            if (!token) return message.error('Please sign-in first!', 3);

            const accessToken = token;
            const data = {
                newPassword,
                confirmPassword,
            };

            const hide = message.loading('Reset password in progress', 0);
            dispatch(apiResetPassword({ accessToken, data }))
                .then((action) => {
                    const { error } = action as unknown as any;
                    if (error) {
                        message.error('Reset password failed!', 3);
                        return hide();
                    }
                    message.success(
                        'Reset password success! Please sign-in again',
                        3
                    );
                    return hide();
                })
                .then(() => {
                    dispatch(apiSignOut()).then((action) => {
                        message.loading(
                            'Redirect to sign-in page in 3-secs.',
                            3
                        );
                        setTimeout(() => {
                            navigate(routes.auth.signin);
                        }, 3000);
                    });
                });
        }
        // reset password by link
        else {
            const linkToken = resetId;
            const data = {
                newPassword,
                confirmPassword,
            };

            const hide = message.loading('Reset password in progress', 0);
            dispatch(apiResetPasswordByLink({ linkToken, data }))
                .then((action) => {
                    const { error } = action as unknown as any;
                    if (error) {
                        message.error('Reset password failed', 3);
                        return hide();
                    }
                    message.success(
                        'Reset password success! Please sign-in again',
                        3
                    );
                    return hide();
                })
                .then(() => {
                    message.loading('Redirect to sign-in page in 3-secs.', 3);
                    setTimeout(() => {
                        navigate(routes.auth.signin);
                    }, 3000);
                });
        }
    }

    return (
        <ResetForm name="auth-reset" layout="vertical" onFinish={onFinish}>
            <F.Item
                name="newPassword"
                label="New Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password',
                    },
                    {
                        pattern: /^[a-zA-Z\d!@#$%&*?]{8,25}$/,
                        message: '8 ~ 25 characters',
                    },
                    {
                        pattern: /^(?=.*[a-z])/,
                        message: 'at least 1 lowercase letter',
                    },
                    {
                        pattern: /^(?=.*[A-Z])/,
                        message: 'at least 1 uppercase letter',
                    },
                    {
                        pattern: /^(?=.*\d)/,
                        message: 'at least 1 number',
                    },
                    {
                        pattern: /^(?=.*[!@#$%&*?])/,
                        message: 'at least 1 symbol !@#$%&*?',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </F.Item>
            <F.Item name="confirmPassword" label="Confirm Password">
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </F.Item>
            <Sep />
            <F.Item>
                <SubmitButton>Submit</SubmitButton>
            </F.Item>
            <F.Item className="float-right">
                <Link
                    to={routes.auth.signin}
                    className="after:content-['_👉']"
                    scrollToTop
                >
                    {' '}
                    Back to sign in
                </Link>
            </F.Item>
        </ResetForm>
    );
}

export default Form;
