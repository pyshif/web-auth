import React, { useCallback } from 'react';
import styled from 'styled-components';
import { defaults } from 'utils/base';

type PropsList = {
    payload: React.ReactNode[];
    direction?: 'vertical' | 'horizontal';
    isOrder?: boolean;
    className?: string;
};

type PropsWrapper = {
    direction?: 'vertical' | 'horizontal';
    isOrder?: boolean;
    children?: React.ReactNode;
    className?: string;
};

const Wrapper = styled((props: PropsWrapper) => {
    return (
        <>
            {props.isOrder ? (
                <ol className={props.className}>{props.children}</ol>
            ) : (
                <ul className={props.className}>{props.children}</ul>
            )}
        </>
    );
})`
    ${(props) => (props.direction == 'horizontal' ? 'display: flex;' : '')}
    ${(props) => (props.direction == 'horizontal' ? 'flex-wrap: nowrap;' : '')}
`;

function List(props: PropsList) {
    const options = defaults<PropsList>(
        {
            direction: 'vertical',
            isOrder: false,
        },
        props
    );

    const Payload = useCallback((props: { payload?: React.ReactNode[] }) => {
        return (
            <>
                {props.payload &&
                    props.payload.map((e, i) => {
                        return <li key={i}>{e}</li>;
                    })}
            </>
        );
    }, []);

    return (
        <Wrapper
            isOrder={options.isOrder}
            direction={options.direction}
            className={options.className}
        >
            <Payload payload={options.payload} />
        </Wrapper>
    );
}

export default List;
