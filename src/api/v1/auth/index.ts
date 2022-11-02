import { AxiosInstance } from 'axios';
import routes from 'api/v1/routes';
import signUp from './signup';
import signIn from './signin';
import signOut from './signout';
import forgot from './forgot';
import reset from './reset';
import user from './user';
import google from './google';


function auth(axios: AxiosInstance) {
    const apiSignUp = signUp(axios);
    const apiSignIn = signIn(axios);
    const apiSignOut = signOut(axios);
    const apiForgot = forgot(axios);
    const apiReset = reset(axios);
    const apiUser = user(axios);
    const apiGoogle = google(axios);

    return {
        health: () => {
            return axios({
                method: 'GET',
                url: routes.auth.health.GET,
                withCredentials: true
            });
        },
        accessTokenValid: (accessToken: string) => {
            return axios({
                method: 'GET',
                url: routes.auth.accessTokenValid.GET,
                withCredentials: true,
                headers: { Authorization: 'Bearer' + accessToken }
            });
        },
        accessTokenRefresh: () => {
            return axios({
                method: 'GET',
                url: routes.auth.accessTokenRefresh.GET,
                withCredentials: true,
            })
        },
        ...apiSignUp,
        ...apiSignIn,
        ...apiSignOut,
        ...apiForgot,
        ...apiReset,
        ...apiUser,
        ...apiGoogle,
    }
}

export default auth;