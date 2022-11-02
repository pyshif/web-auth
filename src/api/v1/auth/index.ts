import { AxiosInstance } from 'axios';
import routes from 'api/v1/routes';
import signUp from './signup';
import signIn from './signin';
import google from './google';
import token from './token';
import signOut from './signout';
import forgot from './forgot';
import reset from './reset';
import user from './user';

function auth(axios: AxiosInstance) {
    const apiSignUp = signUp(axios);
    const apiSignIn = signIn(axios);
    const apiGoogle = google(axios);
    const apiToken = token(axios);
    const apiSignOut = signOut(axios);
    const apiForgot = forgot(axios);
    const apiReset = reset(axios);
    const apiUser = user(axios);

    return {
        health: () => {
            return axios({
                method: 'GET',
                url: routes.auth.health.GET,
                withCredentials: true
            });
        },
        ...apiSignUp,
        ...apiSignIn,
        ...apiGoogle,
        ...apiToken,
        ...apiSignOut,
        ...apiForgot,
        ...apiReset,
        ...apiUser,
    }
}

export default auth;