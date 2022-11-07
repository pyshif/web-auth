import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import Link from 'components/Link';
import List from 'components/List';
import routes from 'utils/routes';
import device from 'utils/device';
import { Link as RL } from 'react-router-dom';

const Section = styled.section`
    padding: 1rem 1rem;
    /* mobile */
    width: 100%;
    /* tablet */
    @media ${device.tablet} {
        width: 30%;
    }
`;

const Title = styled.p`
    font-size: 1.125rem;
    /* text-transform: uppercase; */
    text-align: center;

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 250, 0.2);
        padding: 0 1rem;
        margin: 0.375rem 0 0;
    }
`;

const NavLink = styled(Link)`
    font-size: 0.85rem;
    color: rgb(255, 255, 250);
    margin-bottom: 0.5rem;
`;

type PropsWebMap = ComponentPropsWithoutRef<'section'> & {};

function WebMap(props: PropsWebMap) {
    return (
        <Section {...props}>
            <Title>Navigate</Title>
            <List
                payload={[
                    <NavLink to={routes.home} scrollToTop>
                        Introduction
                    </NavLink>,
                    <NavLink to={routes.user} scrollToTop>
                        User Profile
                    </NavLink>,
                    <NavLink to={routes.auth.signin} scrollToTop>
                        Sign In
                    </NavLink>,
                    <NavLink to={routes.auth.signup} scrollToTop>
                        Sign Up
                    </NavLink>,
                    <NavLink to={routes.auth.forgot} scrollToTop>
                        Forgot Password
                    </NavLink>,
                    <NavLink to={routes.auth.reset.self} scrollToTop>
                        Reset Password
                    </NavLink>,
                ]}
                center
            />
        </Section>
    );
}

export default WebMap;
