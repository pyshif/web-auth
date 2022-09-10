// TODO: Mobile
// company brand
// dropdown list > navlink
// hamburger list

// TODO: Pad
// company brand
// dropdown list > navlink
// people icon (signin/signout)

// TODO: Desktop
// company brand
// dropdown list > navlink
// people icon (signin/signout)
import { MouseEvent, useState, useEffect } from 'react';
import routes from 'utils/routes';
import './index.css';
import Nav from 'components/Nav';

function Navbar() {
    return (
        <div className="border-b-2 bg-white">
            <div className="container p-4 lg:px-0 lg:mx-auto">
                <div className="grid grid-cols-[1fr_repeat(2,auto)] lg:grid-cols-[auto_minmax(0,_1fr)_auto] grid-rows-1 items-center">
                    <div
                        id="company-brand"
                        className="uppercase text-2xl text-slate-500 font-semibold tracking-widest"
                    >
                        <a href={routes.home}>color4</a>
                    </div>
                    <Nav className="mr-5 lg:mr-0" />
                    <div id="icons" className="">
                        <button className="lg:hidden text-xl text-slate-500">
                            <a href={routes.auth.self}>
                                <span className="fa-solid fa-user"></span>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
