import styled from 'styled-components';
import { Form as F, Input, Button, message } from 'antd';
import Link from 'components/Link';
import routes from 'utils/routes';

const Hr = styled.hr`
    margin-bottom: 1.5rem;
`;

type PropsForm = {};

function Form(props: PropsForm) {
    function onFinish(values: any) {
        const hide = message.loading('Action in progress...', 0);
        console.log('values :>> ', values);
        setTimeout(() => {
            message.success('Email has been sent', 3);
            hide();
        }, 3000);
    }

    return (
        <F
            name="auth-forgot"
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
                    Submit
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
