import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from 'utils/routes';
import 'styles/App.css';
import 'antd/dist/antd.css';
import Loading from 'components/Loading';
import useRequestToken from 'hooks/useRequestToken';

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

// common function
function lazyPage(Component: any) {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
}

function App() {
    useRequestToken();

    return (
        <Routes>
            <Route path={routes.home} element={lazyPage(Layout)}>
                <Route path={routes.auth.self} element={lazyPage(Auth)}>
                    <Route
                        path={routes.auth.signin}
                        element={lazyPage(SignIn)}
                    ></Route>
                    <Route
                        path={routes.auth.signup}
                        element={lazyPage(SignUp)}
                    ></Route>
                    <Route
                        path={routes.auth.forgot}
                        element={lazyPage(Forgot)}
                    ></Route>
                    <Route
                        path={routes.auth.reset.self}
                        element={lazyPage(Reset)}
                    ></Route>
                    <Route
                        path={routes.auth.reset.resetId}
                        element={lazyPage(Reset)}
                    ></Route>
                    <Route index element={<Navigate to="/404" />}></Route>
                </Route>
                <Route index element={lazyPage(Home)}></Route>
                <Route path={routes.user} element={lazyPage(User)}></Route>
            </Route>
            <Route path="*" element={lazyPage(Error)}></Route>
        </Routes>
    );
}

export default App;
