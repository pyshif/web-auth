import styled, { StyledComponentProps } from 'styled-components';

const icons = {
    bars: 'fa-solid fa-bars',
    xmark: 'fa-solid fa-xmark',
};

type PropsButton = {
    className?: string;
    bg?: string;
    color?: string;
    size?: string;
};

type IconButton = 'bars' | 'xmark';

type PropsIconButton = PropsButton & {
    icon: IconButton;
    onClick: () => any;
};

const Button = styled.button<PropsButton>`
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
`;

function IconButton(props: PropsIconButton) {
    const defaults = {
        className: '',
        bg: 'ivory',
        color: 'rgb(71, 85, 105)',
        size: '1.25rem',
        icon: 'bars',
        onClick: () => {},
    } as PropsIconButton;

    const { className, icon, bg, color, size, onClick } = {
        ...defaults,
        ...props,
    };

    return (
        <Button
            className={className}
            bg={bg}
            color={color}
            size={size}
            onClick={onClick}
        >
            <i className={icons[icon]}></i>
        </Button>
    );
}

export default IconButton;
