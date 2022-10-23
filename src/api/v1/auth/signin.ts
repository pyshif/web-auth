import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

type DataSignIn = {
    account: string,
    password: string,
};

function signIn(axios: AxiosInstance) {
    return {
        signIn: (data: DataSignIn) => {
            return axios({
                method: 'POST',
                url: routes.auth.signIn.POST,
                withCredentials: true,
                data,
            })
        },
    }
}

export default signIn;