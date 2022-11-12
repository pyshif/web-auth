import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

// request data type
export type DataResetPassword = {
    newPassword: string,
    confirmPassword: string,
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