import { useState } from 'react';
import styled from 'styled-components';
import { Avatar as AvatarOfAntd, Form, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from 'store';
import { apiUpdateUserAvatar } from 'store/features/authSlice';

// Container
const Container = styled.div`
    display: inline-block;
    position: relative;
    cursor: pointer;
    & > input {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
    }
`;

// Input
const Input = styled.input.attrs({
    type: 'file',
    name: 'avatar',
})`
    /* visibility: hidden; */
`;

// Avatar
type PropsAvatar = React.ComponentProps<typeof AvatarOfAntd>;

function Avatar(props: PropsAvatar) {
    const { size, icon, src, ...rest } = props;
    // const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    const validateFileList = (files: FileList): boolean => {
        // console.log('files :>> ', files);

        const rule = {
            maxCount: 1,
            accept: 'image/jpeg, image/png',
            size: 2 * 1024 * 1024, // bytes
        };

        if (files.length > rule.maxCount) {
            console.log('Invalid files amount!');
            return false;
        }

        if (
            Array.from(files).filter((f) => rule.accept.includes(f.type))
                .length != files.length
        ) {
            console.log('Invalid file type!');
            return false;
        }

        if (
            Array.from(files).filter((f) => f.size <= rule.size).length !=
            files.length
        ) {
            console.log('Invalid file size!');
            return false;
        }

        return true;
    };

    const generatePayload = async (files: FileList) => {
        const data = new FormData();
        const key = 'avatar';

        // // wait all files read as data url and append to form-data
        // await Promise.all(
        //     // return numbers of promise
        //     Array.from(files).map((f) => {
        //         return new Promise((resolve) => {
        //             const reader = new FileReader();
        //             reader.onload = () => {
        //                 resolve(''); // fulfilled
        //                 setPreview(reader.result);
        //             };
        //             reader.readAsDataURL(f);
        //         });
        //     })
        // );

        Array.from(files).forEach((f) => {
            data.append(key, f);
        });

        return data;
    };

    const handleUploadAvatar = async (event: any) => {
        // validate
        if (!validateFileList(event.target.files)) return;
        // create payload
        const accessToken = token;
        const data = await generatePayload(event.target.files);
        // send request
        const hide = message.loading('Update avatar in progress...', 0);

        dispatch(apiUpdateUserAvatar({ accessToken, data }))
            .then(() => {
                message.success('Update avatar success!', 3);
                hide();
            })
            .catch((error) => {
                message.error(
                    'Update avatar failed! Error: ' + error.message,
                    3
                );
                hide();
            });
    };

    // demand: onChange -> upload avatar and preview
    // onFinish -> done , send request

    return (
        <Container>
            <AvatarOfAntd
                size={64}
                icon={<UserOutlined style={{ verticalAlign: 'middle' }} />}
                src={src}
                {...rest}
            />
            <Input onChange={handleUploadAvatar} />
        </Container>
    );
}

export default Avatar;
