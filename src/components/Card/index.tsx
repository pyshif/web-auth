import styled from 'styled-components';
import { defaults } from 'utils/base';
// import Antd from 'antd';

type PropsCardWrapper = {
    width: string;
};

const CardWrapper = styled.div<PropsCardWrapper>`
    border: 2px solid rgb(250, 250, 250);
    border-radius: 1.5rem;
    width: ${(props) => props.width};
    max-width: 100%;
`;

type PropsCard = PropsCardWrapper & {
    picture?: React.ReactNode;
    head?: React.ReactNode;
    foot?: React.ReactNode;
    className?: string;
};

function Card(props: PropsCard) {
    const options = defaults<PropsCard>(
        {
            width: '100px',
        },
        props
    );

    return (
        <CardWrapper width={options.width}>
            <CardHead />
            <CardBody />
            <CardFoot />
        </CardWrapper>
    );
}

type PropsCardHead = {
    img?: React.ReactNode;
};

function CardHead(props: PropsCardHead) {
    return <></>;
}

type PropsCardBody = {};

function CardBody(props: PropsCardBody) {
    return <></>;
}

type PropsCardFoot = {};

function CardFoot(props: PropsCardFoot) {
    const options = defaults<PropsCardFoot>({}, props);
    return <></>;
}

export default Card;
