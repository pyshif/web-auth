import styled from 'styled-components';
import { Form as F, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Link from 'components/Link';
import routes from 'utils/routes';

const Hr = styled.hr`
    margin-bottom: 1.5rem;
`;

type PropsForm = {};

function Form(props: PropsForm) {
    const onFinish = (values: any) => {
        console.log('values :>> ', values);
    };

    return (
        <F
            name="auth-reset"
            layout="vertical"
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
            <Hr />
            <F.Item>
                <Button
                    htmlType="submit"
                    type="default"
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
