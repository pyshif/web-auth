import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type PropsHidden = ComponentPropsWithoutRef<'div'> & {
    state: boolean;
    defaultDisplay?: 'inline-block' | 'block' | 'inline';
};

const Hidden = styled.div<PropsHidden>`
    display: ${(props) => {
        const box = props.defaultDisplay && 'inline-block';
        return props.state ? 'none' : box;
    }};
`;

export default Hidden;
