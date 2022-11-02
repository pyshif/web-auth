import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

// TODO: 同一系列 API 似乎很常會有同樣型態的資料，考慮在資料夾創建一個檔案專門宣告資料型態？（如下 Response 回來的 User 資料）

// request payload
export type DataSignIn = {
    email: string,
    password: string,
};

// response payload
export type ResponseSignIn = {
    headers: {
        status: string | '403' | '401' | '200';
    },
    payload: {
        name: string,
        email: string,
        phone: string,
        birthday: string,
        avatar: string,
    }
};

// axios
function signIn(axios: AxiosInstance) {
    return {
        signIn: (data: DataSignIn) => {
            return axios({
                method: 'POST',
                url: routes.auth.signIn.POST,
                withCredentials: true,
                data,
            })
        },
    }
}

export default signIn;