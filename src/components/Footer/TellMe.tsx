import styled from 'styled-components';
import { Form as F, Input } from 'antd';

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
    return (
        <section>
            <Title>Tell me</Title>
            <Text>
                You can leave a message here for me. I am glad to receive any
                advice!
            </Text>
            <F>
                <F.Item>
                    <TA
                        showCount
                        maxLength={300}
                        autoSize
                        placeholder="write something... 😄"
                        onChange={() => {}}
                    />
                </F.Item>
            </F>
            <Text>
                You can also send an email to me by yourself. My email is here
                👇.
            </Text>
        </section>
    );
}

export default TellMe;
