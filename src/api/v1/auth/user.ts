import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { reverse } from 'named-urls';

// request payload
export type DataUpdateUserAvatar = FormData;

// axios
function User(axios: AxiosInstance) {
    return {
        deleteUser: (accessToken: string) => {
            return axios({
                method: 'DELETE',
                url: routes.auth.user.DELETE,
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        },
        updateUserName: (accessToken: string, name: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.name.POST,
                data: {
                    name
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        },
        updateUserBirthday: (accessToken: string, birthday: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.birthday.POST,
                data: {
                    birthday,
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        },
        updateUserPhone: (accessToken: string, phone: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.phone.POST,
                data: {
                    phone
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        },
        updateUserGender: (accessToken: string, gender: 'male' | 'female') => {
            return axios({
                method: 'POST',
                url: routes.auth.user.gender.POST,
                data: {
                    gender
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        },
        updateUserEmail: (accessToken: string, email: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.email.POST,
                data: {
                    email
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        },
        updateUserAvatar: (accessToken: string, data: DataUpdateUserAvatar) => {
            return axios({
                method: 'POST',
                url: routes.auth.user.avatar.POST,
                data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        validateUserNewEmail: (linkToken: string) => {
            return axios({
                method: 'GET',
                url: reverse(routes.auth.user.email._token.GET, { _token: linkToken }),
            });
        },
    }
}

export default User;