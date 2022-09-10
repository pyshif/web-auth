import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import './index.css';

function Layout() {
    return (
        <div className="grid grid-cols-1 grid-rows-[auto_minmax(0,_1fr)_auto] min-h-screen">
            <header className="col-span-1 row-auto">
                <Navbar />
            </header>
            <main className="bg-white">
                <Outlet />
            </main>
            <footer className="bg-amber-500">
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
