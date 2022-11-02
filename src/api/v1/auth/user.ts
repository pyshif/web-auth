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
        editUserName: (accessToken: string, name: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.name.POST,
                data: {
                    name
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        },
        editUserBirthday: (accessToken: string, birthday: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.birthday.POST,
                data: {
                    birthday,
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        },
        editUserPhone: (accessToken: string, phone: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.phone.POST,
                data: {
                    phone
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        },
        editUserEmail: (accessToken: string, data: DataEditUserEmail) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.email.POST,
                data,
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        },
        editUserAvatar: (accessToken: string, data: DataEditUserAvatar) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.avatar.POST,
                data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }
}

export default User;