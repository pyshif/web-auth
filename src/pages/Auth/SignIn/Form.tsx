import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sep from 'components/Sep';
import { Form as F, Checkbox, Button, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import routes from 'utils/routes';
import Link from 'components/Link';
import { useAppSelector, useAppDispatch } from 'store';
import { apiSignIn, DataSignIn } from 'store/features/authSlice';

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
    const dispatch = useAppDispatch();
    const { status, token, user } = useAppSelector((state) => state.auth);

    async function onFinish(values: any) {
        // console.log('values :>> ', values);
        const { email, password, remember } = values;

        // payload
        const data: DataSignIn = {
            email,
            password,
        };

        // request
        const hide = message.loading('Sign-in in progress...', 0);
        dispatch(apiSignIn(data)).then((action) => {
            const { error } = action as unknown as any;
            if (error) {
                message.error('Sign-in failed!', 3);
                return hide();
            }
            message.success('Sign-in success!', 3);
            navigate(routes.user);
            // remember feature
            // FIXME: protect user data in localstorage
            // cookies -> aes -> user email, password
            if (remember) {
                localStorage.setItem(
                    'C4UR',
                    JSON.stringify({ email, password })
                );
            } else {
                localStorage.removeItem('C4UR');
            }
            return hide();
        });
    }

    function onGoogleButton(e: any) {
        console.log('Received values of form :>> ', e);
        // TODO: complete google login in

        // load google gis library -> define loading handler
    }

    let localUser = {
        email: '',
        password: '',
    };
    if (localStorage.getItem('C4UR')) {
        localUser = JSON.parse(localStorage.getItem('C4UR') as string);
    }

    return (
        <SignInForm
            name="auth-signin"
            initialValues={{
                email: localUser.email,
                password: localUser.password,
                remember: false,
            }}
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
                <Link
                    to={routes.auth.forgot}
                    className="float-right"
                    scrollToTop
                >
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
                    to={routes.auth.signup}
                    className="after:content-['_👉']"
                    scrollToTop
                >
                    {' '}
                    Sign up by here
                </Link>
            </F.Item>
        </SignInForm>
    );
}

export default Form;
