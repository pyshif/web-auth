import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { reverse } from 'named-urls';

type DataForgot = {
    email: string,
    hint: string,
};

type DataResetPasswordByLink = {
    new_password: string,
    confirm_password: string,
};

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
        resetPasswordByLink(_token: string, data: DataResetPasswordByLink) {
            return axios({
                method: 'POST',
                url: reverse(routes.auth.forgot._token.POST, { _token }),
                data,
            })
        }
    }
}

export default forgot;