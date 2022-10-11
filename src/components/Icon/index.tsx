import { defaults } from 'utils/base';

export type FaIcon =
    | 'house'
    | 'house-chimney'
    | 'user'
    | 'circle-user'
    | 'bars'
    | 'xmark';

export type OtherIcon = '';

export type Icons = FaIcon | OtherIcon;

type PropsIcon = {
    icon: Icons;
    type?: 'solid' | 'regular';
};

export function Icon(props: PropsIcon) {
    const options = defaults<PropsIcon>(
        {
            type: 'solid',
        },
        props
    );

    const fa = `fa-${options.type} fa-${options.icon}`;

    return <i className={fa}></i>;
}

export default Icon;
