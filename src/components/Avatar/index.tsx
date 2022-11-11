import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar as AvatarOfAntd, Form as FormOfAntd, message } from 'antd';
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
})``;

// Avatar
type PropsAvatar = React.ComponentProps<typeof AvatarOfAntd> & {
    uploading: boolean;
    endUpload: () => void;
};

function Avatar(props: PropsAvatar) {
    const { size, icon, src, uploading, endUpload, ...rest } = props;
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);
    const dataRef = useRef<FormData | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

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

    const generatePayload = async (files: FileList): Promise<FormData> => {
        const data = new FormData();
        const key = 'avatar';

        Array.from(files).forEach((f) => {
            data.append(key, f);
        });

        return data;
    };
    // handle preview and payload
    const handlePreviewAvatar = async (event: any) => {
        // validate
        if (!validateFileList(event.target.files)) return;
        // create payload
        dataRef.current = await generatePayload(event.target.files);
        // preview
        const reader = new FileReader();
        reader.onload = () => {
            if (!reader.result) return;
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    // upload avatar by props of parent-component's state
    const handleUploadAvatar = () => {
        // payload
        const accessToken = token;
        const data = dataRef.current as FormData;
        // send request
        const hide = message.loading('Update avatar in progress...', 0);
        dispatch(apiUpdateUserAvatar({ accessToken, data })).then((action) => {
            const { error } = action as unknown as any;
            if (error) {
                message.error('Update avatar failed!', 3);
                return hide();
            }
            message.success('Update avatar success!', 3);
            return hide();
        });
    };

    useEffect(() => {
        if (uploading && dataRef.current != null) {
            handleUploadAvatar();
            dataRef.current = null;
        }
        endUpload();
        // console.log('uploading :>> ', uploading);
    }, [uploading]);

    return (
        <Container>
            <AvatarOfAntd
                size={64}
                icon={<UserOutlined style={{ verticalAlign: 'middle' }} />}
                src={!preview ? src : preview}
                {...rest}
            />
            <Input onChange={handlePreviewAvatar} />
        </Container>
    );
}

export default Avatar;
