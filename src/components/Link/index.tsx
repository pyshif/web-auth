import styled from 'styled-components';
import { font } from 'utils/font';
import { defaults } from 'utils/base';

type PropsLink = {
    href: string;
    children: string | React.ReactNode;
    className?: string;
};

const Styled = styled.a`
    display: inline-block;
    ${font.didot}
    font-weight: 600;
    &:hover {
        filter: invert(50%);
    }
`;

function Link(props: PropsLink) {
    const options = defaults<PropsLink>({}, props);

    return (
        <Styled href={options.href} className={options.className}>
            {options.children}
        </Styled>
    );
}

export default Link;
