import styled from 'styled-components';
import IconButton from 'components/IconButton';
import React, { useMemo } from 'react';

type PropsNav = {
    show: boolean;
    width?: string;
    maxWidth?: string;
    bg?: string;
    rounded?: string;
};

type PropsOffcanvas = PropsNav & {
    onXMarkClick: () => any;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
};

const Styled = styled.nav<PropsNav>`
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    background-color: ${(props) => props.bg};
    border-radius: ${(porps) => porps.rounded};
    padding: 1rem 1.5rem;
    box-shadow: 1px 2px 12px 3px rgb(230, 230, 230);

    ${(props) => (props.show ? '' : 'display: none;')}
`;

type PropsXMarkButton = {
    bg?: string;
};

const XMarkButton = styled(IconButton)<PropsXMarkButton>`
    background-color: ${(props) => props.bg};
`;

function Offcanvas(props: PropsOffcanvas) {
    const defaults = {
        show: true,
        width: '100%',
        maxWidth: '20rem',
        bg: 'rgb(250, 245, 250, 1)',
        rounded: '0.75rem',
    };

    const options = {
        ...defaults,
        ...props,
    };

    return (
        <Styled
            show={options.show}
            width={options.width}
            maxWidth={options.maxWidth}
            bg={options.bg}
            rounded={options.rounded}
            className={options.className}
        >
            <XMarkButton
                icon="xmark"
                bg={options.bg}
                className="float-right"
                onClick={options.onXMarkClick}
            />
            {Body(options.body)}
            {Footer(options.footer)}
        </Styled>
    );
}

function Body(element: React.ReactNode) {
    return <>{element && element}</>;
}

function Footer(element: React.ReactNode) {
    return (
        <>
            {element && (
                <>
                    <hr />
                    {element}
                </>
            )}
        </>
    );
}

export default Offcanvas;
