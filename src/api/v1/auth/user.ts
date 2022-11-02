import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { reverse } from 'named-urls';

// request payload
export type DataEditUserInfo = {
    name?: string,
    birthday?: string,
    phone?: string,
};

export type DataEditUserEmail = {
    email: string
}

export type DataEditUserAvatar = FormData;

// response payload
export type ResponseEditUserInfo = {
    headers: {
        status: string | '403' | '401' | '200',
    }
}

export type ResponseEditUserEmail = {
    headers: {
        status: string | '403' | '401' | '200',
    }
}

export type ResponseEditUserAvatar = {
    headers: {
        status: string | '403' | '200',
    }
}

// axios
function User(axios: AxiosInstance) {
    return {
        editUserInfo: (accessToken: string, data: DataEditUserInfo) => {
            return axios({
                method: 'POST',
                url: routes.auth.edit.personalInfo.POST,
                data,
                headers: { Authorization: 'Bearer' + accessToken }
            });
        },
        editUserEmail: (accessToken: string, data: DataEditUserEmail) => {
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
        editUserAvatar: (accessToken: string, data: DataEditUserAvatar) => {
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