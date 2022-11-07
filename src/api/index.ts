import axios from 'axios';
import auth from './v1/auth';

export type { DataForgot, DataResetPasswordByLink } from './v1/auth/forgot';
export type { DataResetPassword } from './v1/auth/reset';
export type { DataSignIn } from './v1/auth/signin';
export type { DataSignUp } from './v1/auth/signup';
export type { DataUpdateUserAvatar } from './v1/auth/user';

// create custom axios
const instance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3003/'
});

// api
const apiAuth = auth(instance);

const api = {
    v1: {
        auth: {
            ...apiAuth
        }
    }
};

// 需求
// 1. 前後端溝通階段可以快速的建立、修改、使用 API 路由 -> 更改各 API 版本下的 routes 檔
// 2. 能夠輕易地使用 API -> 將使用場景包進函式當中，撰寫預設值、提供引數更改 API 發送資料
// 3. 能夠輕易的建立、修改 API Response Mock 資料
// 4. 可以 code splitting (x)

// 向下依賴 named-url 套件
// 向上服務 axios
// 最後打包成函式使用

export default api;