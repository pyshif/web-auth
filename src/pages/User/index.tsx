import { useState } from 'react';
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
    apiRequestToken,
    apiSignOut,
} from 'store/features/authSlice';
import Avatar from 'components/Avatar';

const Profile = styled(Card)`
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
`;

type PropsUser = void;

function User(props: PropsUser) {
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.auth);
    const [uploading, setUploading] = useState<boolean>(false);

    async function onFinish(values: any) {
        console.log('values :>> ', values);
        // data
        const { name, birthday, gender, phone, email } = values;
        const promiseArr = new Array();
        let mustToSignOut = false;

        // updating avatar
        setUploading(true);

        // updating username
        if (name !== user.name) {
            const hide = message.loading('Update username in progress...', 0);
            dispatch(apiUpdateUserName({ accessToken: token, name: name }))
                .then(() => {
                    message.success('Update username success!', 3);
                    hide();
                })
                .catch((error) => {
                    message.error('Update username failed!', 3);
                    hide();
                });
        }

        // updaing birthday
        if (birthday !== user.birthday) {
            const hide = message.loading('Update birthday in progress...', 0);
            dispatch(
                apiUpdateUserBirthday({
                    accessToken: token,
                    birthday: birthday,
                })
            )
                .then(() => {
                    message.success('Update birthday success!', 3);
                    hide();
                })
                .catch((error) => {
                    message.error('Update birthday failed!', 3);
                    hide();
                });
        }
        // updaing gender
        if (gender !== user.gender) {
            const hide = message.loading('Update gender in progress...', 0);
            dispatch(
                apiUpdateUserGender({
                    accessToken: token,
                    gender: gender,
                })
            )
                .then(() => {
                    message.success('Update gender success!', 3);
                    hide();
                })
                .catch((error) => {
                    message.error('Update gender failed!', 3);
                    hide();
                });
        }
        // updating phone number
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
            )
                .then(() => {
                    message.success('Update phone number success!', 3);
                    hide();
                })
                .catch((error) => {
                    message.error('Update phone number failed!', 3);
                    hide();
                });
        }
        // updating email address
        if (email !== user.email) {
            const hide = message.loading('Update email address in progress', 0);
            dispatch(
                apiUpdateUserEmail({
                    accessToken: token,
                    email: email,
                })
            )
                .then(() => {
                    mustToSignOut = true; // because refresh/access token need reset
                    message.success('Update email address success!', 3);
                    hide();
                })
                .catch((error) => {
                    message.success('Update email address failed!', 3);
                    hide();
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
