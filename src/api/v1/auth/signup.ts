import { AxiosInstance } from 'axios';
import routes from 'api/v1/routes';
import { reverse } from 'named-urls';

// request payload
export type DataSignUp = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    passwordHint: string,
};

// response payload
export type ResponseSignUp = {
    headers: {
        status: string | '403' | '401' | '400' | '200';
    }
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