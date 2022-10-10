import styled from 'styled-components';

type PropsBlurBg = {
    show: boolean;
    onClick?: () => any;
    className?: string;
};

const Styled = styled.div<PropsBlurBg>`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;

    ${(props) => (props.show ? '' : 'display: none;')}
`;

function BlurBg(props: PropsBlurBg) {
    const defaults = {
        show: true,
        onClick: () => {},
        className: '',
    };

    const options = {
        ...defaults,
        ...props,
    };

    return (
        <Styled
            show={options.show}
            onClick={options.onClick}
            className={`backdrop-blur-sm ${options.className}`}
        />
    );
}

export default BlurBg;
