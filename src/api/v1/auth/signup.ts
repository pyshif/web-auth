import { AxiosInstance } from 'axios';
import routes from 'api/v1/routes';
import { reverse } from 'named-urls';

// request data type
export type DataSignUp = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    passwordHint: string,
};

// axios
function signUp(axios: AxiosInstance) {
    return {
        signUp: (data: DataSignUp) => {
            return axios({
                method: 'POST',
                url: routes.auth.signUp.POST,
                data
            })
        },
        validateEmailAddress: (linkToken: string) => {
            return axios({
                method: 'GET',
                url: reverse(routes.auth.signUp._token.GET, { _token: linkToken })
            });
        }
    }
}

export default signUp;