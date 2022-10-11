import styled, { StyledComponentProps } from 'styled-components';

const icons = {
    bars: 'fa-solid fa-bars',
    xmark: 'fa-solid fa-xmark',
};

type IconButton = 'bars' | 'xmark';

type PropsIconButton = {
    icon: IconButton;
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
            <i className={icons[icon]}></i>
        </Button>
    );
}

export default IconButton;
