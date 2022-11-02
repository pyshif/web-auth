import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

// request payload
export type DataResetPassword = {
    password: string,
    confirm_password: string,
};

// response payload
export type ResponseResetPassword = {
    headers: {
        status: string | '401' | '403' | '200';
    },
};

// axios
function Reset(axios: AxiosInstance) {
    return {
        ResetPassword: (accessToken: string, data: DataResetPassword) => {
            return axios({
                method: 'POST',
                url: routes.auth.reset.POST,
                data,
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        }
    }
}

export default Reset;