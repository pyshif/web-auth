import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { font } from 'utils/font';
import { Run } from '@styled-icons/boxicons-regular/Run';
import { Flag } from '@styled-icons/bootstrap/Flag';
import { gsap } from 'gsap';

import About from './About';
import WebMap from './WebMap';
import Contact from './Contact';
import TellMe from './TellMe';

const Styled = styled.div`
    color: rgb(255, 255, 250);
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 0.75rem;
    background-color: rgb(31, 45, 65);
    padding: 0.25rem 1.25rem;
`;

const Way = styled.div`
    position: relative;
    top: -1.5rem;
`;

const RunIcon = styled(Run)`
    width: 1.25rem;
    color: rgb(31, 45, 65);
    position: absolute;
`;

const FlagIcon = styled(Flag)`
    width: 1.25rem;
    color: rgb(31, 45, 65);
    position: absolute;
    right: 0;
    opacity: 0;
`;

function Footer() {
    // const RunRef = useRef<any>();
    // const FlagRef = useRef<any>();

    // useEffect(() => {
    //     const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    //     tl.to(RunRef.current, {
    //         duration: 20,
    //         right: '1.25rem',
    //         rotate: 360,
    //         ease: 'none',
    //     }).to(FlagRef.current, { duration: 2, opacity: 1 });
    // }, []);

    return (
        <Styled>
            <div className="container mx-auto">
                {/* decoration animation */}
                {/* <Way>
                    <RunIcon ref={RunRef} />
                    <FlagIcon ref={FlagRef} />
                </Way> */}
                {/* <RunIcon></RunIcon> */}
                {/* content */}
                <div className="flex flex-wrap justify-center mb-3">
                    <About />
                    <WebMap />
                </div>
                <TellMe />
                <Contact />
            </div>
        </Styled>
    );
}

export default Footer;
