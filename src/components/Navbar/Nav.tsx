import { useState, useCallback } from 'react';
import routes from 'utils/routes';
import styled from 'styled-components';
import device from 'utils/device';

import IconButton from 'components/IconButton';
import BlurBg from 'components/BlurBg';
import Offcanvas from 'components/Offcanvas';
import List from 'components/List';
import IconLink from 'components/IconLink';
import Link, { PropsLink } from 'components/Link';
import SignOutButton from 'components/SignOutButton';

type PropsNav = {
    className?: string;
};

const NavIconLink = styled(IconLink)`
    color: rgb(71, 85, 105);
`;

const NavLink = styled(Link)<PropsLink>`
    color: rgb(71, 85, 105);
`;

// Mobile Nav
export function MobileNav(props: PropsNav) {
    const [hidden, setHidden] = useState<boolean>(true);

    const defaults = {
        className: '',
    };

    const options = {
        ...defaults,
        ...props,
    };

    const handleHiddenState = () => {
        setHidden((prev) => !prev);
    };

    const Links = useCallback(() => {
        const payload = [
            <NavIconLink
                icon="house"
                to={routes.home}
                className="capitalize p-1 m-1"
                defaults
                scrollToTop
            >
                home
            </NavIconLink>,
            <NavIconLink
                icon="user"
                to={routes.auth.signin}
                className="capitalize p-1 m-1"
                defaults
                scrollToTop
            >
                auth
            </NavIconLink>,
        ];

        return <List payload={payload} />;
    }, []);

    return (
        <nav className={options.className}>
            <IconButton icon="bars" onClick={handleHiddenState} />
            <SignOutButton style={{ marginLeft: '1rem' }} />
            <BlurBg show={!hidden} onClick={handleHiddenState} />
            <Offcanvas
                show={!hidden}
                body={<Links />}
                onXMarkClick={handleHiddenState}
            />
        </nav>
    );
}

// Tabelet Nav
export function TabletNav(props: PropsNav) {
    const Links = useCallback(() => {
        const payload = [
            <NavLink
                to={routes.home}
                className="capitalize p-1 m-1"
                defaults
                scrollToTop
            >
                home
            </NavLink>,
            <NavLink
                to={routes.auth.signin}
                className="capitalize p-1 m-1"
                defaults
                scrollToTop
            >
                auth
            </NavLink>,
            <SignOutButton />,
        ];

        return <List payload={payload} direction="horizontal" />;
    }, []);

    return (
        <nav className={props.className}>
            <Links />
        </nav>
    );
}

const RWDMobileNav = styled(MobileNav)<PropsNav>`
    @media ${device.tablet} {
        display: none;
    }
`;

const RWDTabletNav = styled(TabletNav)<PropsNav>`
    display: none;

    @media ${device.tablet} {
        display: block;
    }
`;

export function Nav(props: PropsNav) {
    return (
        <>
            <RWDMobileNav className={props.className} />
            <RWDTabletNav className={props.className} />
        </>
    );
}

export default Nav;
