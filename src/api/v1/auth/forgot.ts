import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { reverse } from 'named-urls';

// request payload
export type DataForgot = {
    email: string,
    hint: string,
};

export type DataResetPasswordByLink = {
    new_password: string,
    confirm_password: string,
};

// response payload
export type ResponseForgot = {
    headers: {
        status: string | '401' | '403' | '200';
    }
};

export type ResponseResetPasswordByLink = {
    headers: {
        status: string | '403' | '200';
    }
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