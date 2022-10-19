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
import { Jest } from '@styled-icons/simple-icons/Jest';
import { Githubactions } from '@styled-icons/simple-icons/Githubactions';
import { Greensock } from '@styled-icons/simple-icons/Greensock';

import { Nodejs } from '@styled-icons/boxicons-logos/Nodejs';
import { Express } from '@styled-icons/simple-icons/Express';
import { Mariadb } from '@styled-icons/simple-icons/Mariadb';
import { Aws } from '@styled-icons/boxicons-logos/Aws';

const IconWrapper = styled.div`
    & svg {
        margin: 0 0 1rem 0.85rem;
        width: 2.5rem;
    }

    & a {
        color: rgb(255, 255, 250);
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
        <Section {...props}>
            <Title>What is this project ?</Title>
            <Text>
                Colorful is a web project about JWT authentication and Google
                Sign In API.
            </Text>
            <Text>In frontend, we use this technology:</Text>
            <IconWrapper>
                <Link href="https://reactjs.org/" target="_blank" title="react">
                    <ReactLogo />
                </Link>
                <Link
                    href="https://styled-components.com/"
                    target="_blank"
                    title="styled-components"
                >
                    <Styledcomponents />
                </Link>
                <Link
                    href="https://redux.js.org/"
                    target="_blank"
                    title="redux"
                >
                    <Redux />
                </Link>
                <Link
                    href="https://ant.design/"
                    target="_blank"
                    title="ant-design"
                >
                    <Antdesign />
                </Link>
                <Link
                    href="https://tailwindcss.com/"
                    target="_blank"
                    title="tailwindcss"
                >
                    <TailwindCss />
                </Link>
                <Link
                    href="https://postcss.org/"
                    target="_blank"
                    title="postcss"
                >
                    <Postcss />
                </Link>
                <Link
                    href="https://webpack.js.org/"
                    target="_blank"
                    title="webpack"
                >
                    <Webpack />
                </Link>
                <Link href="https://babeljs.io/" target="_blank" title="babel">
                    <Babel />
                </Link>
                <Link
                    href="https://www.typescriptlang.org/"
                    target="_blank"
                    title="typescript"
                >
                    <Typescript />
                </Link>
                <Link href="https://jestjs.io/" target="_blank" title="jest">
                    <Jest />
                </Link>
                <Link
                    href="https://github.com/features/actions"
                    target="_blank"
                    title="github-action"
                >
                    <Githubactions />
                </Link>
                <Link
                    href="https://greensock.com/"
                    target="_blank"
                    title="green-sock"
                >
                    <Greensock />
                </Link>
            </IconWrapper>
            <Text>In backend, we use this technology:</Text>
            <IconWrapper>
                <Link
                    href="https://nodejs.org/en/"
                    target="_blank"
                    title="node.js"
                >
                    <Nodejs />
                </Link>
                <Link
                    href="https://expressjs.com/"
                    target="_blank"
                    title="express"
                >
                    <Express />
                </Link>
                <Link
                    href="https://mariadb.org/"
                    target="_blank"
                    title="mariadb"
                >
                    <Mariadb />
                </Link>
                <Link
                    href="https://aws.amazon.com/"
                    target="_blank"
                    title="aws"
                >
                    <Aws />
                </Link>
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
