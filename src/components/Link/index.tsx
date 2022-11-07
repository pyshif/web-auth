import styled from 'styled-components';
import { ComponentProps } from 'react';
import { Link as RLink } from 'react-router-dom';
import { fonts } from 'utils/font';

export type PropsLink = ComponentProps<typeof RLink> & {
    defaults?: boolean;
    scrollToTop?: boolean;
};

const L = styled(RLink)<PropsLink>`
    display: inline-block;
    &:hover {
        filter: invert(50%);
    }

    /* ${(props) =>
        props.defaults
            ? `font-size: 0.875rem; font-weight: 600; font-family: ${fonts.rubik};`
            : ''} */
`;

function Link(props: PropsLink) {
    const { scrollToTop, defaults, ...rest } = props;
    const defaultStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        fontFamily: fonts.rubik,
    };

    return (
        <L
            onClick={() => {
                const main = document.querySelector('main');
                if (main && scrollToTop) main.scroll(0, 0);
                // if (scrollToTop) window.scroll(0, 0);
                // console.log('scrollToTop :>> ', scrollToTop);
            }}
            style={defaults ? defaultStyle : {}}
            {...rest}
        >
            {props.children}
        </L>
    );
}

export default Link;
