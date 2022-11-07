import styled from 'styled-components';
import Sep from 'components/Sep';
import { useNavigate } from 'react-router-dom';
import { Form as F, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
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

type PropsForm = {};

function Form(props: PropsForm) {
    const navigate = useNavigate();

    async function onFinish(values: any) {
        console.log('values :>> ', values);
        // confirm access token or match params

        // validate values

        // prepare payload

        // send request
        // display loading-message
        const hide = message.loading('Reset password in progress...', 0);
        try {
            // receive response
            const response = await new Promise((value) =>
                setTimeout(() => {
                    const random = Math.random() * 10 + 1;
                    value(random);
                }, 3000)
            );

            if ((response as number) < 6) throw new Error('something error');

            message.success('Reset password successful!');
            hide();

            // sign out

            //
            navigate(routes.auth.signin);
        } catch (error) {
            message.error('Reset password failed! Please try again later.');
            hide();
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
