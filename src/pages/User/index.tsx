import React, { useState } from 'react';
import styled from 'styled-components';
import Hidden from 'components/Hidden';
import Sep from 'components/Sep';
import {
    Avatar,
    Card,
    Button,
    Upload,
    Form as F,
    Input,
    DatePicker,
    message,
} from 'antd';
import type { UploadProps, DatePickerProps } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import AvatarJPG from 'images/avatar-example.jpg';

// Get
// TODO: Get Profile Data from Redux

// Set
// TODO: Upload Avatar: click -> choose file -> preview -> send to backend -> message(progress...) -> success -> message(success) -> update Redux
// TODO: Update Profile: enter edit -> update data -> done -> send to backend -> message(progress...) -> sucess -> message(success) -> update Redux

const Section = styled.section`
    /* input::placeholder {
        color: green;
    } */
    input[disabled],
    .ant-picker.ant-picker-disabled {
        color: rgb(0, 0, 0);
        background: rgb(255, 255, 255);
    }
`;

const Profile = styled(Card)`
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
`;

type PropsUser = {
    avatar: string;
    username: string;
    birthday: string;
    gender: string;
    phone: string;
    email: string;
};

const propsUpload: UploadProps = {
    action: 'https://localhost:3000/upload.do',
    beforeUpload: (file) => {
        console.log('file :>> ', file);
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg';
        if (!isPNG && !isJPG) {
            message.error(`${file.name} is not a png or jpg file!`);
        }

        return isPNG || isJPG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
        console.log(info.fileList);
    },
};

function User(props: PropsUser) {
    const [profile, setProfile] = useState<PropsUser>({
        avatar: AvatarJPG,
        username: 'Liz Chen',
        birthday: '1993-01-01',
        gender: 'female',
        phone: '0911-111-111',
        email: 'liz@mail.com',
    });
    const [readOnly, setReadOnly] = useState<boolean>(true);

    async function onFinish(values: any) {
        console.log('onFinish');
        console.log('values :>> ', values);
        // prepare payload

        // send request (promise)
        // display loading-message
        const hide = message.loading('profile updating in progress...', 0);
        try {
            // receive success-response
            const response = await new Promise((value) =>
                setTimeout(() => {
                    const random = Math.random() * 10 + 1;
                    console.log('random :>> ', random);
                    value(random);
                }, 5000)
            );
            if ((response as number) < 5) throw new Error('something error');
            // display success-message, and hide loading-message
            message.success('profile updating successful!', 3);
            hide();
            // re-disabled form
            setReadOnly(true);
        } catch (error) {
            // receive failed-response
            console.log('error :>> ', error);
            // display failed-message, and hide loading-message
            message.error('profile updating failed!', 3);
            hide();
        }
    }

    function onReadOnly(e: React.MouseEvent<HTMLButtonElement>) {
        console.log('onReadOnly');
        setReadOnly(false);
    }

    return (
        <Section>
            <div className="container mx-auto px-5 py-9">
                <Profile title="User Profile">
                    <F
                        name="user-profile"
                        labelCol={{ span: 6 }}
                        onFinish={onFinish}
                        disabled={readOnly}
                        initialValues={profile}
                    >
                        <Upload {...propsUpload}>
                            <Avatar
                                size={64}
                                icon={
                                    <UserOutlined
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                }
                                src={profile.avatar}
                            />
                        </Upload>

                        <Sep />

                        <F.Item label="Username" name="username">
                            <Input type="text" placeholder="username" />
                        </F.Item>
                        <F.Item label="Birthday" name="birthday">
                            <Input type="date" />
                        </F.Item>
                        <F.Item label="Gender" name="gender">
                            <Input placeholder="male, female, other" />
                        </F.Item>
                        <F.Item label="Phone" name="phone">
                            <Input type="tel" placeholder="0911-111-111" />
                        </F.Item>
                        <F.Item label="Email" name="email">
                            <Input
                                type="email"
                                placeholder="example@mail.com"
                            />
                        </F.Item>
                        <Hidden state={readOnly}>
                            <F.Item className="float-right">
                                <Button type="default" htmlType="submit" danger>
                                    Done
                                </Button>
                            </F.Item>
                        </Hidden>
                    </F>
                    <Hidden state={!readOnly}>
                        <Button className="float-right" onClick={onReadOnly}>
                            Edit
                        </Button>
                    </Hidden>
                </Profile>
            </div>
        </Section>
    );
}

export default User;
