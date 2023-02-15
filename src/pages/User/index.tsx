import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'utils/routes';
import styled from 'styled-components';
import Sep from 'components/Sep';
import { Card, Button, Form, Input, message } from 'antd';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
    apiUpdateUserName,
    apiUpdateUserBirthday,
    apiUpdateUserPhone,
    apiUpdateUserGender,
    apiUpdateUserEmail,
    apiSignOut,
} from 'store/features/authSlice';
import Avatar from 'components/Avatar';

const Profile = styled(Card)`
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
`;

function User() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.auth);
    const [uploading, setUploading] = useState<boolean>(false);
    // FIXME: forceRender to fix <Form /> can't correctly render redux data.
    const [, forceRender] = useState<any>();
    useEffect(() => {
        forceRender({});
    }, [user]);
    // FIXME: end

    async function onFinish(values: any) {
        // data
        const { name, birthday, gender, phone, email } = values;

        // updating avatar
        setUploading(true);

        // updating username
        // console.log('name :>> ', name);
        // console.log('user.name :>> ', user.name);
        if (name !== user.name) {
            const hide = message.loading('Update user name in progress...', 0);
            dispatch(
                apiUpdateUserName({ accessToken: token, name: name })
            ).then((action) => {
                const { error } = action as unknown as any;
                if (error) {
                    message.error('Update user name failed!', 3);
                    return hide();
                }
                message.success('Update user name success!', 3);
                return hide();
            });
        }

        // updaing birthday
        // console.log('birthday :>> ', birthday);
        // console.log('user.birthday :>> ', user.birthday);
        if (birthday !== user.birthday) {
            const hide = message.loading('Update birthday in progress...', 0);
            dispatch(
                apiUpdateUserBirthday({
                    accessToken: token,
                    birthday: birthday,
                })
            ).then((action) => {
                const { error } = action as unknown as any;
                if (error) {
                    message.error('Update birthday failed!', 3);
                    return hide();
                }
                message.success('Update birthday success!', 3);
                return hide();
            });
        }
        // updaing gender
        // console.log('gender :>> ', gender);
        // console.log('user.gender :>> ', user.gender);
        if (gender !== user.gender) {
            const hide = message.loading('Update gender in progress...', 0);
            dispatch(
                apiUpdateUserGender({
                    accessToken: token,
                    gender: gender,
                })
            ).then((action) => {
                const { error } = action as unknown as any;
                if (error) {
                    message.error('Update gender failed!', 3);
                    return hide();
                }
                message.success('Update gender success!', 3);
                return hide();
            });
        }
        // updating phone number
        // console.log('phone :>> ', phone);
        // console.log('user.phone :>> ', user.phone);
        if (phone !== user.phone) {
            const hide = message.loading(
                'Update phone number in progress...',
                0
            );
            dispatch(
                apiUpdateUserPhone({
                    accessToken: token,
                    phone: phone,
                })
            ).then((action) => {
                const { error } = action as unknown as any;
                if (error) {
                    message.error('Update phone number failed!', 3);
                    return hide();
                }
                message.success('Update phone number success!', 3);
                return hide();
            });
        }
        // updating email address
        // console.log('email :>> ', email);
        // console.log('user.email :>> ', user.email);
        if (email !== user.email) {
            const hide = message.loading('Update email address in progress', 0);
            dispatch(
                apiUpdateUserEmail({
                    accessToken: token,
                    email: email,
                })
            )
                .then((action) => {
                    const { error } = action as unknown as any;
                    if (error) {
                        message.success('Update email address failed!', 3);
                        return hide();
                    }
                    message.success(
                        'Update email address success! Please receive validation email.',
                        3
                    );
                    return hide();
                })
                .then(() => {
                    // have to login again
                    dispatch(apiSignOut()).then((action) => {
                        message.loading('Redirect to sign-in page in 3s...', 3);
                        setTimeout(() => {
                            navigate(routes.auth.signin);
                        }, 3000);
                    });
                });
        }
    }

    return (
        <section className="container mx-auto px-5 py-9">
            <Profile title="User Profile">
                <Form
                    name="user-profile"
                    labelCol={{ span: 6 }}
                    onFinish={onFinish}
                    initialValues={user}
                >
                    <Avatar
                        src={user.avatar}
                        uploading={uploading}
                        endUpload={() => {
                            setUploading(false);
                        }}
                    />

                    <Sep />

                    <Form.Item label="Username" name="name">
                        <Input type="text" placeholder="username" />
                    </Form.Item>
                    <Form.Item label="Birthday" name="birthday">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender">
                        <Input placeholder="male or female" />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone">
                        <Input type="tel" placeholder="0900000000" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" placeholder="example@mail.com" />
                    </Form.Item>

                    <Form.Item className="float-right">
                        <Button type="default" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Profile>
        </section>
    );
}

export default User;
