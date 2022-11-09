import { ComponentPropsWithoutRef } from 'react';
import { defaults } from 'utils/base';

export type FaIcon =
    | 'house'
    | 'house-chimney'
    | 'user'
    | 'circle-user'
    | 'bars'
    | 'xmark'
    | 'bug'
    | 'code'
    | 'envelope'
    | 'paper-plane'
    | 'circle-user'
    | 'github'
    | 'right-from-bracket';

export type OtherIcon = '';

export type Icons = FaIcon | OtherIcon;

type PropsIcon = ComponentPropsWithoutRef<'i'> & {
    icon: Icons;
    type?: 'solid' | 'regular' | 'brands';
};

export function Icon(props: PropsIcon) {
    const options = defaults<PropsIcon>(
        {
            type: 'solid',
        },
        props
    );

    const fa = `fa-${options.type} fa-${options.icon}`;

    return <i className={fa} {...options}></i>;
}

export default Icon;
