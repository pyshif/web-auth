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

function Link(props: PropsLink) {
    return <A {...props}>{props.children}</A>;
}

// Link.defaultStyle = {
//     fontSize: '1rem',
//     fontWeight: 600,
//     fontFamily: fonts.didot,
// };

export default Link;