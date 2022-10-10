import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }   
    100% {
        transform: rotate(360deg);
    }
`;

const dot_pulse = keyframes`
    0% {
        box-shadow: 0 0 0 -1px darkolivegreen;
    }
    50% {
        box-shadow: 0 0 0 1px darkolivegreen;
    }
    100% {
        box-shadow: 0 0 0 -1px darkolivegreen;
    }
`;

const Styled = styled.div`
    &.hidden {
        display: none;
    }

    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 2000;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    /* align */
    display: flex;

    .token {
        margin: auto;
        /* align */
        display: flex;
        align-items: center;

        .circle {
            width: 30px;
            height: 30px;
            border: 3px solid darkolivegreen;
            border-top: 3px solid lightgray;
            border-radius: 50%;
            animation: ${spin} 3s linear infinite;
        }

        .text {
            margin-left: 0.75rem;
            font-weight: bolder;
            color: darkolivegreen;
        }

        .dot {
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background: darkolivegreen;
            animation: ${dot_pulse} 3s linear 0.25s infinite;
            position: relative;
            margin-left: 1rem;

            &:before {
                content: '';
                display: inline-block;
                width: 2px;
                height: 2px;
                background: darkolivegreen;
                border-radius: 50%;
                position: absolute;
                right: 10px;
                animation: ${dot_pulse} 3s linear 0s infinite;
            }

            &:after {
                content: '';
                display: 'inline-block';
                width: 2px;
                height: 2px;
                background: darkolivegreen;
                border-radius: 50%;
                position: absolute;
                left: 10px;
                animation: ${dot_pulse} 3s linear 0.5s infinite;
            }
        }
    }
`;

type Props = {
    complete?: boolean;
};

export default function Loading(props: Props) {
    const { complete } = props;

    return (
        <Styled className={complete ? 'hidden' : ''}>
            <div className="token">
                <div className="circle"></div>
                <div className="text">Loading</div>
                <div className="dot"></div>
            </div>
        </Styled>
    );
}
