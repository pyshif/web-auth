import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from 'store';
import { apiTellMe } from 'store/features/helpSlice';
import { useSelector } from 'react-redux';

type PropsTellMe = {};

const Title = styled.p`
    font-size: 1.125rem;
    /* text-decoration: underline; */
    /* text-transform: uppercase; */
    text-align: center;

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: rgba(250, 250, 250, 0.2);
        padding: 0 1rem;
        margin: 0.375rem 0 0;
    }
`;

const Text = styled.p`
    font-size: 0.85rem;
`;

const { TextArea } = Input;

const TA = styled(TextArea)`
    &::after {
        color: rgb(255, 255, 250);
    }
`;

// TODO: complete tell me api features
function TellMe(props: PropsTellMe) {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    const onFinish = (values: any) => {
        // console.log('values :>> ', values);
        const { feedback } = values;
        // validate
        if (!feedback) return;

        const hide = message.loading('Send feedback in progress...', 0);
        const accessToken = token;
        dispatch(apiTellMe({ accessToken, feedback })).then((action) => {
            const { error } = action as unknown as any;
            if (error) {
                message.error(
                    'Send feedback failed! Please sign-in first or try again later.',
                    3
                );
                return hide();
            }
            message.success('Send feedback success!', 3);
            return hide();
        });
    };

    return (
        <section>
            <Title>Tell me</Title>
            <Text>
                You can leave a message here for me. I am glad to receive any
                advice!
            </Text>
            <Form onFinish={onFinish} style={{ position: 'relative' }}>
                <Form.Item name="feedback">
                    <TA
                        showCount
                        maxLength={300}
                        autoSize
                        placeholder="write something... 😄 (Please sign-in first!)"
                    />
                </Form.Item>
                <Form.Item style={{ position: 'absolute', top: 0, right: 0 }}>
                    <Button htmlType="submit">Send</Button>
                </Form.Item>
            </Form>
            <Text>
                You can also send an email to me by yourself. My email is here
                👇.
            </Text>
        </section>
    );
}

export default TellMe;
