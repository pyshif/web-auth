import 'styles/App.css';
import { useState, lazy, Suspense } from 'react';
import R, { BrowserRouter, Routes, Route } from 'react-router-dom';

const Layout = lazy(() => import('pages/Layout'));
const Home = lazy(() => import('pages/Home'));
const Auth = lazy(() => import('pages/Auth'));
const Error = lazy(() => import('pages/Error'));

function App() {
    const fallback = <div>Suspense fallback</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={fallback}>
                            <Layout />
                        </Suspense>
                    }
                >
                    <Route
                        path="/auth"
                        element={
                            <Suspense fallback={fallback}>
                                <Auth />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        index
                        element={
                            <Suspense fallback={fallback}>
                                <Home />
                            </Suspense>
                        }
                    ></Route>
                </Route>
                <Route
                    path="*"
                    element={
                        <Suspense fallback={fallback}>
                            <Error />
                        </Suspense>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
