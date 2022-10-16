import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import Link from 'components/Link';
import List from 'components/List';
import routes from 'utils/routes';
import device from 'utils/device';

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

const NavLink = styled(Link)`
    font-size: 1rem;
    color: white;

    &:hover {
        filter: invert(30%);
    }

    margin-bottom: 0.5rem;
`;

type PropsWebMap = ComponentPropsWithoutRef<'section'> & {};

function WebMap(props: PropsWebMap) {
    return (
        <Section>
            <Title>navigate</Title>
            <List
                payload={[
                    <NavLink href={routes.auth.signin}>Sign In</NavLink>,
                    <NavLink href={routes.auth.signup}>Sign Up</NavLink>,
                    <NavLink href={routes.auth.forgot}>
                        Forgot Password
                    </NavLink>,
                    <NavLink href={routes.auth.reset.self}>
                        Reset Password
                    </NavLink>,
                ]}
                center
            />
        </Section>
    );
}

export default WebMap;
