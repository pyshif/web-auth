import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { reverse } from 'named-urls';

type DataEditUserInfo = {
    name?: string,
    birthday?: string,
    phone?: string,
};

type DataEditUserEmail = {
    email: string
}

type DataEditUserAvatar = FormData;

function User(axios: AxiosInstance) {
    return {
        EditUserInfo: (accessToken: string, data: DataEditUserInfo) => {
            return axios({
                method: 'POST',
                url: routes.auth.edit.personalInfo.POST,
                data,
                headers: { Authorization: 'Bearer' + accessToken }
            });
        },
        EditUserEmail: (accessToken: string, data: DataEditUserEmail) => {
            return axios({
                method: 'POST',
                url: routes.auth.edit.email.POST,
                data,
                headers: { Authorization: 'Bearer' + accessToken }
            });
        },
        // This is unuseful here. Just example
        // ValidateEmail: (_token: string) => {
        //     return axios({
        //         method: 'GET',
        //         url: reverse(routes.auth.edit.email._token.GET, { _token }),
        //     });
        // }
        EditUserAvatar: (accessToken: string, data: DataEditUserAvatar) => {
            return axios({
                method: 'POST',
                url: routes.auth.edit.avatar.POST,
                data,
                headers: {
                    Authorization: 'Bearer' + accessToken,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }
}

export default User;