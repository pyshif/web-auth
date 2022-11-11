import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

// request data type
export type DataSignIn = {
    email: string,
    password: string,
};

// response data type
export type DataResponseSignIn = {
    accessToken: string;
}

// axios
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