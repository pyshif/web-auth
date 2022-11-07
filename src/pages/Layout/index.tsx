import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import styled from 'styled-components';
import { fonts } from 'utils/font';

const Styled = styled.div`
    font-family: ${fonts.rubik};

    max-width: 100%;
    /* min-height: 100vh; */
    height: 100vh;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-areas:
        'header'
        'main';
    /* 'footer'; */

    header {
        grid-area: header;
        /* background: red; */
    }

    main {
        grid-area: main;
        overflow: auto;
        /* background: blue; */
    }

    /* footer {
        grid-area: footer;
    } */
`;

function Layout() {
    return (
        <Styled>
            <header>
                <Navbar className="container mx-auto" />
            </header>
            <main>
                <Outlet />
                <footer>
                    <Footer />
                </footer>
            </main>
        </Styled>
    );
}

export default Layout;
