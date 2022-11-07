import styled from 'styled-components';
import { fonts } from 'utils/font';
import { ComponentPropsWithoutRef } from 'react';

type PropsA = {
    defaults?: boolean;
};

const A = styled.a<PropsA>`
    display: inline-block;
    &:hover {
        filter: invert(50%);
    }

    ${(props) =>
        props.defaults
            ? `font-size: 0.875rem; font-weight: 600; font-family: ${fonts.rubik};`
            : ''}
`;

export type PropsLink = ComponentPropsWithoutRef<'a'> & {
    defaults?: boolean;
};

function ALink(props: PropsLink) {
    return (
        <A target="_blank" {...props}>
            {props.children}
        </A>
    );
}

export default ALink;
