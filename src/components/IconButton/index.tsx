import styled from 'styled-components';
import { Icon, Icons } from 'components/Icon';
import { ComponentPropsWithoutRef } from 'react';

const Button = styled.button`
    background-color: ivory;
    color: rgb(71, 85, 105);
    font-size: 1.25rem;

    & > i:hover {
        filter: invert(50%);
        transform: translateX(-1%) translateY(-1%);
    }

    &:focus-visible {
        outline: none;
    }
`;

type PropsIconButton = ComponentPropsWithoutRef<'button'> & {
    icon: Icons;
};

function IconButton(props: PropsIconButton) {
    const defaults = {
        icon: 'bars',
    };

    const { className, icon, onClick, ...rest } = {
        ...defaults,
        ...props,
    };

    return (
        <Button className={className} onClick={onClick} {...rest}>
            <Icon icon={icon} />
        </Button>
    );
}

export default IconButton;
