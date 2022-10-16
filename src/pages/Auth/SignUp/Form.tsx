import styled from 'styled-components';
import { Form as F, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'components/Link';
import routes from 'utils/routes';

const Hr = styled.hr`
    margin-bottom: 1.5rem;
`;

type PropsForm = {};

function Form(props: PropsForm) {
    function onFinish(values: any) {
        const hide = message.loading('Register in progress...', 0);

        setTimeout(() => {
            message.success('Success! Please confirm your email.', 3);
            hide();
        }, 5000);
    }

    function onClick(values: any) {}

    return (
        <F
            name="auth-signup"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{
                width: '100%',
                maxWidth: 360,
                border: '1px solid rgba(240, 240, 240)',
                borderRadius: '0.5rem',
                padding: '2.875rem 2.5rem',
                margin: 'auto',
            }}
            layout="vertical"
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
                    // prefix={<UserOutlined className="site-form-item.icon" />}
                    placeholder="example@gmail.com"
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
            <Hr />
            <F.Item>
                <Button
                    type="default"
                    htmlType="submit"
                    style={{ width: '100%' }}
                >
                    Register
                </Button>
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
        </F>
    );
}

export default Form;
