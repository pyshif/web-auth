import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import styled from 'styled-components';

const Styled = styled.div`
    max-width: 100%;
    min-height: 100vh;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-areas:
        'header'
        'main'
        'footer';

    header {
        grid-area: 'header';
        /* background: red; */
    }

    main {
        grid-area: 'main';
        /* background: blue; */
    }

    footer {
        grid-area: 'footer';
        /* background: gold; */
    }
`;

function Layout() {
    return (
        <Styled>
            <header>
                <Navbar className="container mx-auto" />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </Styled>
    );
}

export default Layout;
