import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

function google(axios: AxiosInstance) {
    return {
        googleSignIn: (googleIDToken: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.google.signin.POST,
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer' + googleIDToken,
                }
            });
        },
    }
}

export default google;