import styled from 'styled-components';
import Link from 'components/Link';
import { Icon, Icons } from 'components/Icon';
import { defaults } from 'utils/base';

type PropsIconLink = {
    icon: Icons;
    href: string;
    children: React.ReactNode;
    iconAfter?: boolean;
    iconSpacing?: string;
    className?: string;
};

type PropsIconBox = {
    icon: Icons;
    spacing: string;
    className?: string;
};

const IconBox = styled((props: PropsIconBox) => (
    <span className={props.className}>
        <Icon icon={props.icon} />
    </span>
))`
    display: inline-block;
    text-align: center;
    width: ${(props) => props.spacing};
`;

function IconLink(props: PropsIconLink) {
    const options = defaults<PropsIconLink>(
        {
            iconAfter: false,
            iconSpacing: '1.75rem',
        },
        props
    );

    return (
        <Link href={options.href} className={options.className}>
            {!options.iconAfter && (
                <IconBox
                    icon={options.icon}
                    spacing={options.iconSpacing as string}
                />
            )}
            {options.children}
            {options.iconAfter && (
                <IconBox
                    icon={options.icon}
                    spacing={options.iconSpacing as string}
                />
            )}
        </Link>
    );
}

export default IconLink;
