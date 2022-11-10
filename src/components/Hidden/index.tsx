import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type PropsHidden = ComponentPropsWithoutRef<'div'> & {
    state: boolean;
};

const Styled = styled.div<PropsHidden>`
    ${(props) => (props.state ? 'display: none' : '')}
`;

function Hidden(props: PropsHidden) {
    return <Styled {...props}>{props.children}</Styled>;
}

export default Hidden;
