import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from 'utils/routes';
import 'styles/App.css';
import 'antd/dist/antd.css';
import Loading from 'components/Loading';

// page
const Layout = lazy(() => import('pages/Layout'));
const Home = lazy(() => import('pages/Home'));
const Auth = lazy(() => import('pages/Auth'));
const SignIn = lazy(() => import('pages/Auth/SignIn'));
const SignUp = lazy(() => import('pages/Auth/SignUp'));
const Forgot = lazy(() => import('pages/Auth/Forgot'));
const Reset = lazy(() => import('pages/Auth/Reset'));
const User = lazy(() => import('pages/User'));
const Error = lazy(() => import('pages/Error'));

function App() {
    function pages(C: any) {
        return (
            <Suspense fallback={<Loading />}>
                <C />
            </Suspense>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home} element={pages(Layout)}>
                    <Route path={routes.auth.self} element={pages(Auth)}>
                        <Route
                            path={routes.auth.signin}
                            element={pages(SignIn)}
                        ></Route>
                        <Route
                            path={routes.auth.signup}
                            element={pages(SignUp)}
                        ></Route>
                        <Route
                            path={routes.auth.forgot}
                            element={pages(Forgot)}
                        ></Route>
                        <Route
                            path={routes.auth.reset.self}
                            element={pages(Reset)}
                        ></Route>
                        <Route
                            path={routes.auth.reset.resetId}
                            element={pages(Reset)}
                        ></Route>
                        <Route index element={<Navigate to="/404" />}></Route>
                    </Route>
                    <Route index element={pages(Home)}></Route>
                    <Route path={routes.user} element={pages(User)}></Route>
                </Route>
                <Route path="*" element={pages(Error)}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
