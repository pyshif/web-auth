import styled from 'styled-components';
import Link from 'components/Link';
import type { PropsLink } from 'components/Link';
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

    const { icon, iconAfter, iconSpacing, ...rest } = options;

    return (
        // <Link
        //     to={options.to}
        //     className={options.className}
        //     defaults={options.defaults}
        // >
        <Link {...rest}>
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
