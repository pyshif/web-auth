import styled from 'styled-components';
import { font } from 'utils/font';

import About from './About';
import WebMap from './WebMap';
import Contact from './Contact';

const Styled = styled.div`
    color: rgb(230, 230, 230);
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 0.75rem;
    background-color: rgb(31, 45, 65);
    padding: 0.25rem 1.25rem;
`;

function Footer() {
    return (
        <Styled>
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center mb-3">
                    <About className="order-2" />
                    <WebMap className="order-1" />
                </div>
                <Contact />
            </div>
        </Styled>
    );
}

export default Footer;
