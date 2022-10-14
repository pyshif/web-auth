import styled from 'styled-components';
import { Form as F, Checkbox, Button, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import routes from 'utils/routes';
import Link from 'components/Link';

const Hr = styled.hr`
    margin-bottom: 1.5rem;
`;

type PropsForm = {};

function Form(props: PropsForm) {
    const onFinish = (values: any) => {
        console.log('Received values of form :>> ', values);
    };

    const onClick = (e: any) => {
        console.log('Received values of form :>> ', e);
    };

    return (
        <F
            name="auth"
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
                <Button
                    type="default"
                    htmlType="submit"
                    style={{ width: '100%' }}
                >
                    Log in
                </Button>
            </F.Item>
            <Hr />
            <F.Item>
                <Button
                    type="default"
                    htmlType="button"
                    style={{ width: '100%', color: '#475569' }}
                    onClick={onClick}
                >
                    Googole
                </Button>
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
        </F>
    );
}

export default Form;
