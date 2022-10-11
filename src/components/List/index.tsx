import React, { useCallback } from 'react';

type PropsList = {
    payload?: React.ReactNode[];
    isOrder?: boolean;
    className?: string;
};

function List(props: PropsList) {
    const defaults = {
        isOrder: false,
    };

    const options = {
        ...defaults,
        ...props,
    };

    const Wrapper = useCallback(
        (props: {
            children?: React.ReactNode;
            isOrder?: boolean;
            className?: string;
        }) => {
            return props.isOrder ? (
                <ol className={props.className}>{props.children}</ol>
            ) : (
                <ul className={props.className}>{props.children}</ul>
            );
        },
        []
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
        <Wrapper isOrder={options.isOrder} className={options.className}>
            <Payload payload={options.payload} />
        </Wrapper>
    );
}

export default List;
