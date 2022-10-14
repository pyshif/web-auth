import styled from 'styled-components';
import { Card, Image } from 'antd';
import { ComponentPropsWithoutRef } from 'react';
import { font } from 'utils/font';

type PropsBoard = ComponentPropsWithoutRef<'div'> & {
    img?: string;
    title?: React.ReactNode;
};

const Text = styled.p`
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 0;
`;

function Board(props: PropsBoard) {
    const { img, title, ...rest } = props;

    return (
        <Card
            cover={
                <Image
                    preview={false}
                    src={img}
                    style={{
                        width: 60,
                        margin: 'auto',
                    }}
                />
            }
            style={{
                width: '100%',
                padding: '2.5rem 0 1rem',
                border: 0,
                maxWidth: 360,
                margin: 'auto',
                justifyContent: 'center',
            }}
            {...rest}
        >
            <Text style={{}}>{title}</Text>
        </Card>
    );
}

export default Board;
