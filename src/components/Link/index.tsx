import { loadOptions } from '@babel/core';
import styled from 'styled-components';
import { defaults } from 'utils/base';

type PropsLink = {
    href?: string;
    children?: string | React.ReactNode;
    className?: string;
};

const Styled = styled.a`
    display: inline-block;

    &:hover {
        filter: invert(50%);
    }
`;

function Link(props: PropsLink) {
    const options = defaults<PropsLink>(
        {
            href: '/',
        },
        props
    );

    return (
        <Styled href={options.href} className={options.className}>
            {options.children}
        </Styled>
    );
}

export default Link;
