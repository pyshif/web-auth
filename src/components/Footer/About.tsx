import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import device from 'utils/device';
import Icon from 'components/Icon';
import Link from 'components/Link';
import { ReactLogo } from '@styled-icons/boxicons-logos/ReactLogo';
import { Styledcomponents } from '@styled-icons/simple-icons/Styledcomponents';
import { Redux } from '@styled-icons/boxicons-logos/Redux';
import { Antdesign } from '@styled-icons/simple-icons/Antdesign';
import { TailwindCss } from '@styled-icons/boxicons-logos/TailwindCss';
import { Postcss } from '@styled-icons/simple-icons/Postcss';
import { Webpack } from '@styled-icons/simple-icons/Webpack';
import { Babel } from '@styled-icons/simple-icons/Babel';
import { Typescript } from '@styled-icons/simple-icons/Typescript';

import { Nodejs } from '@styled-icons/boxicons-logos/Nodejs';
import { Express } from '@styled-icons/simple-icons/Express';
import { Mariadb } from '@styled-icons/simple-icons/Mariadb';
import { Aws } from '@styled-icons/boxicons-logos/Aws';

const IconWrapper = styled.div`
    & > * {
        margin: 0 0 1rem 0.85rem;
        width: 2.5rem;
    }
`;

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
    /* text-transform: uppercase; */
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

const SocialLink = styled(Link)`
    font-size: 0.75rem;
    color: rgb(255, 255, 250);
    margin-right: 1rem;
`;

const Text = styled.p`
    font-size: 0.85rem;
`;

type PropsAbout = ComponentPropsWithoutRef<'section'> & {};

function About(props: PropsAbout) {
    return (
        <Section>
            <Title>What is this project ?</Title>
            <Text>
                Colorful is a web project about JWT authentication and Google
                Sign In API.
            </Text>
            <Text>In frontend, we use this technology:</Text>
            <IconWrapper>
                <ReactLogo />
                <Styledcomponents />
                <Redux />
                <Antdesign />
                <TailwindCss />
                <Postcss />
                <Webpack />
                <Babel />
                <Typescript />
            </IconWrapper>
            <Text>In backend, we use this technology:</Text>
            <IconWrapper>
                <Nodejs />
                <Express />
                <Mariadb />
                <Aws />
            </IconWrapper>
            <Text>
                If you want to know more about our project, welcome to my github
                repo.
            </Text>
            <br />
            <SocialLink
                href="https://github.com/pyshif/web-auth"
                target="_blank"
            >
                <Icon icon="github" type="brands" /> Frontend Repo
            </SocialLink>
            <SocialLink
                href="https://github.com/pyshif/web-auth-server"
                target="_blank"
            >
                <Icon icon="github" type="brands" /> Backend Repo
            </SocialLink>
        </Section>
    );
}

export default About;
