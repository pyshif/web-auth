import { MouseEvent, useState } from 'react';
import routes from 'utils/routes';

function Nav(props: { className: string }) {
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
                <ul className="lg:flex text-md text-slate-500 font-semibold">
                    <li className="flex mb-2">
                        <a href={routes.home}>Log</a>
                        <button onClick={hide} className="ml-auto">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                    <li className="mb-2">
                        <a href={routes.auth.self}>User</a>
                    </li>
                </ul>
            </nav>
            {/* desktop nav */}
            <nav className="hidden lg:block">
                <ul className="flex flex-nowrap justify-end text-md text-slate-500 font-semibold">
                    <li>
                        <a href={routes.home}>Log</a>
                    </li>
                    <li className="ml-5">
                        <a href={routes.auth.self}>User</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
