import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { reverse } from 'named-urls';

// request data type
export type DataForgot = {
    email: string,
    passwordHint: string,
};

export type DataResetPasswordByLink = {
    newPassword: string,
    confirmPassword: string,
};

// axios
function forgot(axios: AxiosInstance) {
    return {
        forgotPassword: (data: DataForgot) => {
            return axios({
                method: 'POST',
                url: routes.auth.forgot.POST,
                data,
            })
        },
        // will deprecate
        resetPasswordByLink(linkToken: string, data: DataResetPasswordByLink) {
            return axios({
                method: 'POST',
                url: reverse(routes.auth.forgot._token.POST, { _token: linkToken }),
                data,
            })
        }
    }
}

export default forgot;