import { MouseEvent, useState, useCallback } from 'react';
import routes from 'utils/routes';
import styled from 'styled-components';

import IconButton from 'components/IconButton';
import BlurBg from 'components/BlurBg';
import Offcanvas from 'components/Offcanvas';
import List from 'components/List';
import Link from 'components/Link';

type PropsNav = {
    className?: string;
};

const MyLink = styled(Link)`
    color: red;
    font-size: 1rem;
`;

export function Nav(props: PropsNav) {}

// Mobile Nav
export function MobileNav(props: PropsNav) {
    const defaults = {
        className: '',
    };

    const options = {
        ...defaults,
        ...props,
    };

    const handleIconButtonClick = useCallback(() => {}, []);

    const handleBlurBgClick = useCallback(() => {}, []);

    const Links = () => {
        const a = [
            <MyLink href={routes.home} className="capitalize p-1 m-1">
                home
            </MyLink>,
            <Link href={routes.auth.signin} className="capitalize p-1 m-1">
                auth
            </Link>,
        ];

        return <List payload={a} />;
    };

    return (
        <div className={options.className}>
            <IconButton icon="bars" onClick={handleIconButtonClick} />
            <BlurBg show={false} onClick={handleBlurBgClick} />
            <Offcanvas show={true} body={<Links />} />
        </div>
    );
}

// Tabelet Nav

function OldNav(props: { className: string }) {
    const [hidden, setHidden] = useState<string>('hidden');

    const show = (e: MouseEvent) => {
        setHidden('');
    };

    const hide = (e: MouseEvent) => {
        setHidden('hidden');
    };

    return (
        <div className={props.className}>
            <button className="lg:hidden text-xl text-slate-500" onClick={show}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <div
                data-blur=""
                className={`fixed top-0 right-0 h-screen w-screen backdrop-blur-sm ${hidden}`}
                onClick={hide}
            ></div>
            {/* mobile nav */}
            <nav
                className={`fixed top-4 right-4 w-full max-w-xs p-6 bg-white rounded-xl shadow-md ${hidden}`}
            >
                <ul className="lg:flex text-lg text-slate-500 font-bold">
                    <li className="flex mb-2">
                        <a href={routes.home}>Log</a>
                        <button onClick={hide} className="ml-auto">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                    <li className="mb-2">
                        <a href={routes.auth.signin}>User</a>
                    </li>
                </ul>
            </nav>
            {/* desktop nav */}
            <nav className="hidden lg:block">
                <ul className="flex flex-nowrap justify-end text-lg text-slate-500 font-bold">
                    <li>
                        <a href={routes.home} className="hover:text-slate-400">
                            Log
                        </a>
                    </li>
                    <li className="ml-5">
                        <a
                            href={routes.auth.signin}
                            className="hover:text-slate-400"
                        >
                            User
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
