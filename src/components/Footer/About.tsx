import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import device from 'utils/device';

const Section = styled.section`
    padding: 1rem 1rem;
    /* mobile */
    width: 100%;
    /* tablet */
    @media ${device.tablet} {
        width: 70%;
    }
`;

const Title = styled.p`
    font-size: 1.125rem;
    /* text-decoration: underline; */
    text-transform: uppercase;
    text-align: center;

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: rgba(250, 250, 250, 0.2);
        padding: 0 1rem;
        margin: 0.375rem 0 0;
    }
`;

const SocialMedia = styled.div``;

type PropsAbout = ComponentPropsWithoutRef<'section'> & {};

function About(props: PropsAbout) {
    return (
        <Section>
            <Title>What is this project ?</Title>
            <SocialMedia />
        </Section>
    );
}

export default About;
