import styled from 'styled-components';
import Sep from 'components/Sep';
import { useNavigate } from 'react-router-dom';
import { Form as F, Input, Button, message } from 'antd';
import Link from 'components/Link';
import routes from 'utils/routes';

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

type PropsForm = {};

function Form(props: PropsForm) {
    const navigate = useNavigate();

    async function onFinish(values: any) {
        // prepared payload

        // send request
        // display loading-message
        const hide = message.loading('Forgot password in progrss...', 0);
        try {
            const response = await new Promise((value) =>
                setTimeout(() => {
                    const random = Math.random() * 10 + 1;
                    value(random);
                }, 3000)
            );

            if ((response as number) < 6) throw new Error('something error');

            // display success-message
            message.success(
                'Reset-link has been sent! Please reset your password in 30-mins.',
                3
            );
            hide();
            // redirect to sign-in page
            navigate(routes.auth.signin);
        } catch (error) {
            message.error('Request failed. Please try again after 1-min.', 3);
            hide();
        }
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
                    href={routes.auth.signin}
                    className="after:content-['_👉']"
                >
                    {' '}
                    Back to sign in
                </Link>
            </F.Item>
        </ForgotForm>
    );
}

export default Form;
