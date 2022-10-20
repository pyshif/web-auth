import styled from 'styled-components';
import Sep from 'components/Sep';
import { useNavigate } from 'react-router-dom';
import { Form as F, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'components/Link';
import routes from 'utils/routes';

const SignUpForm = styled(F)`
    width: 100%;
    max-width: 360px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 0.5rem;
    padding: 2.875rem 2.5rem;
    margin: auto;
`;

const RegisterButton = styled(Button).attrs({
    htmlType: 'submit',
})`
    width: 100%;
`;

type PropsForm = {};

function Form(props: PropsForm) {
    const navigate = useNavigate();

    async function onFinish(values: any) {
        console.log('values :>> ', values);
        // prepare payload

        // send request
        // display loading-message
        const hide = message.loading('Register in progress...', 0);
        try {
            // receive response
            const response = await new Promise((value) =>
                setTimeout(() => {
                    const random = Math.random() * 10 + 1;
                    value(random);
                }, 3000)
            );
            // console.log('response :>> ', response);
            if ((response as number) < 6) throw new Error('something error');

            message.success(
                'Sign-up successful! Please check your mailbox.',
                3
            );
            hide();
            // redirect to sign-in page
            navigate(routes.auth.signin);
        } catch (error) {
            // display error-message
            message.error('Sign-up failed! Please try again after 1-min.', 3);
            hide();
        }
    }

    return (
        <SignUpForm
            name="auth-signup"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
        >
            <F.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                    {
                        pattern: /^[a-zA-Z,\s]{1,30}$/,
                        message: '1 - 30 characters (letter, comma, space)',
                    },
                ]}
            >
                <Input placeholder="Username" />
            </F.Item>
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
                <Input
                    prefix={<UserOutlined />}
                    placeholder="example@mail.com"
                />
            </F.Item>
            <F.Item
                label="Password"
                name="password"
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
                    placeholder="8 - 25 characters"
                />
            </F.Item>
            <F.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="8 - 25 characters"
                />
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
                <RegisterButton>Register</RegisterButton>
            </F.Item>

            <F.Item className="float-right">
                <Link
                    href={routes.auth.signin}
                    className="after:content-['_👉']"
                >
                    {' '}
                    Back to sign in
                </Link>
            </F.Item>
        </SignUpForm>
    );
}

export default Form;
