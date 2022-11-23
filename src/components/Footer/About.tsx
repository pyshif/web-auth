import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import device from 'utils/device';
import Icon from 'components/Icon';
import ALink from 'components/ALink';
import { ReactLogo } from '@styled-icons/boxicons-logos/ReactLogo';
import { Reactrouter } from '@styled-icons/simple-icons/Reactrouter';
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
import { Pm2 } from '@styled-icons/simple-icons/Pm2';
import Knex from 'images/knex-js.svg';

const IconWrapper = styled.div`
    & svg {
        margin: 0 0 1rem 0.85rem;
        width: 2.5rem;
    }

    & img {
        display: inline;
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

const SocialLink = styled(ALink)`
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
                Sign-In API.
            </Text>
            <Text>In frontend, we use this technology:</Text>
            <IconWrapper>
                <ALink href="https://reactjs.org/" title="react">
                    <ReactLogo />
                </ALink>
                <ALink
                    href="https://reactrouter.com/en/main"
                    title="react-router-dom"
                >
                    <Reactrouter />
                </ALink>
                <ALink
                    href="https://styled-components.com/"
                    title="styled-components"
                >
                    <Styledcomponents />
                </ALink>
                <ALink href="https://redux.js.org/" title="redux">
                    <Redux />
                </ALink>
                <ALink href="https://ant.design/" title="ant-design">
                    <Antdesign />
                </ALink>
                <ALink href="https://tailwindcss.com/" title="tailwindcss">
                    <TailwindCss />
                </ALink>
                <ALink href="https://postcss.org/" title="postcss">
                    <Postcss />
                </ALink>
                <ALink href="https://webpack.js.org/" title="webpack">
                    <Webpack />
                </ALink>
                <ALink href="https://babeljs.io/" title="babel">
                    <Babel />
                </ALink>
                <ALink
                    href="https://www.typescriptlang.org/"
                    title="typescript"
                >
                    <Typescript />
                </ALink>
                <ALink href="https://jestjs.io/" title="jest">
                    <Jest />
                </ALink>
                <ALink
                    href="https://github.com/features/actions"
                    title="github-action"
                >
                    <Githubactions />
                </ALink>
                <ALink href="https://greensock.com/" title="green-sock">
                    <Greensock />
                </ALink>
            </IconWrapper>
            <Text>In backend, we use this technology:</Text>
            <IconWrapper>
                <ALink href="https://nodejs.org/en/" title="node.js">
                    <Nodejs />
                </ALink>
                <ALink href="https://expressjs.com/" title="express">
                    <Express />
                </ALink>
                <ALink href="https://mariadb.org/" title="mariadb">
                    <Mariadb />
                </ALink>
                <ALink href="https://aws.amazon.com/" title="aws">
                    <Aws />
                </ALink>
                <ALink href="https://pm2.keymetrics.io" title="pm2">
                    <Pm2 />
                </ALink>
                <ALink href="https://knexjs.org" title="knex">
                    <img src={Knex} alt="" />
                </ALink>
            </IconWrapper>
            <Text>
                If you want to know more about our project, welcome to my github
                repo.
            </Text>
            <br />
            <SocialLink href="https://github.com/pyshif/web-auth">
                <Icon icon="github" type="brands" /> Frontend Repo
            </SocialLink>
            <SocialLink href="https://github.com/pyshif/web-auth-server">
                <Icon icon="github" type="brands" /> Backend Repo
            </SocialLink>
        </Section>
    );
}

export default About;
