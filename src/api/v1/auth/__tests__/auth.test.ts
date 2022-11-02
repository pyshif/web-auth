import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });
import api, { DataSignUp, DataSignIn, DataForgot, DataResetPasswordByLink } from 'api';
import { AxiosError } from 'axios';
import { ResponseResetPasswordByLink } from '../forgot';

let linkToken: string;
let accessToken: string;


describe("testing sign-up and sign-in api", () => {

    // let refreshToken: string;
    // let cookie: string;

    // sign-up.ts
    it('should be sign-up success.', async () => {
        const data: DataSignUp = {
            name: process.env.TESTING_USER_NAME as string,
            email: process.env.TESTING_USER_EMAIL as string,
            password: process.env.TESTING_USER_PASSWORD as string,
            confirmPassword: process.env.TESTING_USER_PASSWORD as string,
            passwordHint: process.env.TESTING_USER_PASSWORD_HINT as string
        };

        let response: any;

        try {
            response = await api.v1.auth.signUp(data);
            linkToken = response.data.linkToken;
            // console.log('response :>> ', response);
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }

        expect(response.status).toBe(200);
    });

    it('should be success for validating email address.', async () => {
        let response: any;
        try {
            response = await api.v1.auth.validateEmailAddress(linkToken);
            // console.log('response :>> ', response);

        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }

        expect(response.status).toBe(200);
    });
    // sign-in.ts
    it('should be success for sign-in and get access/refresh token.', async () => {
        let response: any;
        try {
            const data: DataSignIn = {
                email: process.env.TESTING_USER_EMAIL as string,
                password: process.env.TESTING_USER_PASSWORD as string
            };

            response = await api.v1.auth.signIn(data);
            // console.log('response :>> ', response);
            accessToken = response.data.accessToken;
            // refreshToken = analyzeRefreshTokenFromCookie();
            // console.log('refreshToken :>> ', refreshToken);
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }

        expect(response.status).toBe(200);
    });

    // sign-out.ts
    it('should be success for sign-out', async () => {
        let response: any;
        try {
            response = await api.v1.auth.signOut();
            // console.log('response :>> ', response);
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }

        expect(response.status).toBe(204);
    });

});

describe('testing forgot password api', () => {

    it('should be get reset password token.', async () => {
        let response: any;
        try {
            const data: DataForgot = {
                email: process.env.TESTING_USER_EMAIL as string,
                passwordHint: process.env.TESTING_USER_PASSWORD_HINT as string,
            };
            response = await api.v1.auth.forgotPassword(data);
            // console.log('response :>> ', response);
            linkToken = response.data.linkToken;
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }
    });

    it('should be success reseting password by link.', async () => {
        let response: any;
        try {
            const data: DataResetPasswordByLink = {
                newPassword: process.env.TESTING_USER_NEW_PASSWORD as string,
                confirmPassword: process.env.TESTING_USER_NEW_PASSWORD as string
            };
            response = await api.v1.auth.resetPasswordByLink(linkToken, data);
            // console.log('response :>> ', response);
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }
    });

    it('should be success for sign-in with new password.', async () => {
        let response: any;
        try {
            const data: DataSignIn = {
                email: process.env.TESTING_USER_EMAIL as string,
                password: process.env.TESTING_USER_NEW_PASSWORD as string
            };

            response = await api.v1.auth.signIn(data);
            // console.log('response :>> ', response);

            accessToken = response.data.accessToken;
            // refreshToken = analyzeRefreshTokenFromCookie();
            // console.log('refreshToken :>> ', refreshToken);
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }

        expect(response.status).toBe(200);
    });
});



describe('deleting user', () => {
    // user.ts/delete
    it('should be success for deleting user by accessToken', async () => {
        let response: any;
        try {
            response = await api.v1.auth.deleteUser(accessToken);
            // console.log('response :>> ', response);
        } catch (error) {
            response = (error as AxiosError).response;
            // console.log('error :>> ', error);
        }

        expect(response.status).toBe(200);
    });
});

// common function
// function analyzeRefreshTokenFromCookie(): string {
//     const cookies = document.cookie.split('; ');
//     let i;
//     for (i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].split('=');
//         const key = cookie[0];
//         const value = cookie[1];
//         if (key !== 'C4RFT') continue;
//         // console.log('cookie :>> ', cookie);
//         return value;
//     }
//     return '';
// }