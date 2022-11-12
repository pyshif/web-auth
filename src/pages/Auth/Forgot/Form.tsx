import styled from 'styled-components';
import Sep from 'components/Sep';
import { useNavigate } from 'react-router-dom';
import { Form as F, Input, Button, message } from 'antd';
import Link from 'components/Link';
import routes from 'utils/routes';
import { useAppDispatch, useAppSelector } from 'store/index';
import { apiForgotPassword } from 'store/features/authSlice';
import type { DataForgot } from 'store/features/authSlice';

const ForgotForm = styled(F)`
    width: 100%;
    max-width: 360px;
    border: 1px solide rgb(240, 240, 240);
    padding: 2.875rem 2.5rem;
    margin: auto;
`;

const SubmitButton = styled(Button).attrs({
    htmlType: 'submit',
})`
    width: 100%;
`;

function Form() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function onFinish(values: any) {
        // request payload
        const { email, passwordHint } = values;
        const data: DataForgot = {
            email,
            passwordHint,
        };
        // send request
        const hide = message.loading('Forgot password in progress...', 0);
        dispatch(apiForgotPassword(data))
            .then((action) => {
                const { error } = action as unknown as any;
                if (error) {
                    message.error('Forgot password failed!', 3);
                    return hide();
                }
                message.success(
                    'Reset-password link has been sent to your email! Please reset your password in 30-mins!',
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

    return (
        <ForgotForm
            name="auth-forgot"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
        >
            <F.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                    {
                        type: 'email',
                        message: 'Please input correct email fromat!',
                    },
                ]}
            >
                <Input placeholder="example@gmail.com" />
            </F.Item>
            <F.Item
                label="Password Hint"
                name="passwordHint"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        pattern: /^[a-zA-Z\d\s]{6,25}$/,
                        message: '6 ~ 25 characters (letter, number, space)',
                    },
                ]}
            >
                <Input placeholder="6 - 25 characters" />
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
        </ForgotForm>
    );
}

export default Form;
