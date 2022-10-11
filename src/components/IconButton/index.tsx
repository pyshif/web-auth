import styled, { StyledComponentProps } from 'styled-components';
import { Icon, Icons } from 'components/Icon';

type PropsIconButton = {
    icon: Icons;
    onClick: () => any;
    className?: string;
};

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

function IconButton(props: PropsIconButton) {
    const defaults = {
        className: '',
        icon: 'bars',
        onClick: () => {},
    } as PropsIconButton;

    const { className, icon, onClick } = {
        ...defaults,
        ...props,
    };

    return (
        <Button className={className} onClick={onClick}>
            <Icon icon={icon} />
        </Button>
    );
}

export default IconButton;
