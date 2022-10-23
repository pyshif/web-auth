import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

type DataResetPassword = {
    password: string,
    confirm_password: string,
};

function Reset(axios: AxiosInstance) {
    return {
        ResetPassword: (accessToken: string, data: DataResetPassword) => {
            return axios({
                method: 'POST',
                url: routes.auth.reset.POST,
                data,
                headers: { Authorization: 'Bearer' + accessToken }
            });
        }
    }
}

export default Reset;