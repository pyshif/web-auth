import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Sep from 'components/Sep';
import { Form as F, Checkbox, Button, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import routes from 'utils/routes';
import Link from 'components/Link';

const SignInForm = styled(F)`
    width: 100%;
    max-width: 360px;
    border: 1px solid rgba(240, 240, 240);
    border-radius: 0.5rem;
    padding: 2.875rem 2.5rem;
    margin: auto;
`;

const SubmitButton = styled(Button).attrs({
    htmlType: 'submit',
})`
    width: 100%;
`;

const GoogleButton = styled(Button)`
    width: 100%;
`;

function Form() {
    const navigate = useNavigate();

    async function onFinish(values: any) {
        console.log('Received values of form :>> ', values);
        // remember checked
        // TODO: crypt account and password and store into localstorage

        // prepare payload
        // TODO: prepare payload

        // send request
        // display message loading
        const hide = message.loading('Sign-in progress...', 0);
        try {
            // receive success-response
            // TODO: complete axios
            const response = await new Promise((value) =>
                setTimeout(() => {
                    const random = Math.random() * 10 + 1;
                    value(random);
                }, 3000)
            );

            if ((response as number) < 6) throw new Error('something error');
            // display message success, hide loading, redirect hint
            message.success('Sign-in successful!', 3);
            hide();
            // redirect to user-profile page
            navigate(routes.user);
        } catch (error) {
            // display message error, hide loading-message
            message.loading('somthing error...', 3);
            hide();
        }
    }

    function onGoogleButton(e: any) {
        console.log('Received values of form :>> ', e);
        // TODO: complete google login in
    }

    return (
        <SignInForm
            name="auth-signin"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <F.Item
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
                    prefix={<UserOutlined className="site-form-item.icon" />}
                    placeholder="Email"
                />
            </F.Item>
            <F.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </F.Item>
            <F.Item>
                <F.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ span: 12 }}
                    noStyle
                >
                    <Checkbox>Remember me</Checkbox>
                </F.Item>
                <Link href={routes.auth.forgot} className="float-right">
                    Forgot password ?
                </Link>
            </F.Item>

            <F.Item>
                <SubmitButton>Log in</SubmitButton>
            </F.Item>
            <Sep />
            <F.Item>
                <GoogleButton onClick={onGoogleButton}>Googole</GoogleButton>
            </F.Item>
            <F.Item className="float-right">
                Or{' '}
                <Link
                    href={routes.auth.signup}
                    className="after:content-['_👉']"
                >
                    {' '}
                    Sign up by here
                </Link>
            </F.Item>
        </SignInForm>
    );
}

export default Form;
