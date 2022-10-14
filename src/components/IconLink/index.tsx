import styled from 'styled-components';
import Link, { PropsLink } from 'components/Link';
import { Icon, Icons } from 'components/Icon';
import { defaults } from 'utils/base';

type PropsIconLink = PropsLink & {
    icon: Icons;
    iconAfter?: boolean;
    iconSpacing?: string;
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
            iconSpacing: '2rem',
        },
        props
    );

    return (
        <Link
            href={options.href}
            className={options.className}
            defaults={options.defaults}
        >
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
