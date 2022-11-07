import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from 'api';
import decodeJWT from 'jwt-decode';
import { AxiosError } from 'axios';
import type {
    DataForgot,
    DataResetPasswordByLink,
    DataResetPassword,
    DataSignUp,
    DataSignIn,
    DataUpdateUserAvatar,
} from 'api';

export type {
    DataForgot,
    DataResetPasswordByLink,
    DataResetPassword,
    DataSignUp,
    DataSignIn,
    DataUpdateUserAvatar,
} from 'api';

export type StateAuth = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: AxiosError | null;
    token: string,
    user: {
        name: string;
        birthday: string;
        phone: string;
        gender: 'male' | 'female' | '';
        avatar: string;
        email: string;
    }
};

const initialState: StateAuth = {
    status: 'idle',
    error: null,
    token: '',
    user: {
        name: 'unknown',
        birthday: 'YYYY-MM-DD',
        phone: '+886911000111',
        gender: 'male',
        avatar: '',
        email: 'unknown@mail.com'
    },
};

export const apiHealth = createAsyncThunk<any>('auth/health', async () => {
    try {
        const response = await api.v1.auth.health();
        // console.log('response :>> ', response);
        // return response;
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        // console.log('error :>> ', error);
        return error;
    }
});

// sign-up
export const apiSignUp = createAsyncThunk<any, DataSignUp>('auth/signUp', async (data) => {
    try {
        const response = await api.v1.auth.signUp(data) as unknown as any;
        return {
            status: response.status,
        };
    } catch (error) {
        return error;
    }
});
// sign-in 
export const apiSignIn = createAsyncThunk<any, DataSignIn>('auth/signIn', async (data) => {
    try {
        const response = await api.v1.auth.signIn(data) as unknown as any;
        const { accessToken } = response.data;
        if (!accessToken) {
            throw new Error('Invalid access-token!');
        }
        const user = decodeJWT(accessToken) as any;
        return {
            status: response.status,
            token: accessToken,
            user: {
                name: user.name,
                birthday: user.birthday,
                phone: user.phone,
                gender: user.gender,
                avatar: user.avatar,
                email: user.email,
            }
        };
    } catch (error) {
        return error;

    }
});

// google
export const apiGoogleSignIn = createAsyncThunk<any, string>('auth/google', async (googleIDToken) => {
    try {
        const response = await api.v1.auth.googleSignIn(googleIDToken) as unknown as any;

        return response;
    } catch (error) {
        return error;
    }
});

// token
export const apiValidateToken = createAsyncThunk<any, string>('auth/validateToken', async (accessToken) => {
    try {
        const response = await api.v1.auth.validateToken(accessToken) as unknown as any;
        return {
            status: response.status
        }
    } catch (error) {
        return error;
    }
});

export const apiRequestToken = createAsyncThunk<any>('auth/requestToken', async () => {
    try {
        const response = await api.v1.auth.requestToken() as unknown as any;
        const { accessToken } = response.data;
        if (!accessToken) {
            throw new Error('Invalid access-token!');
        }
        const user = decodeJWT(accessToken) as any;

        return {
            status: response.status,
            token: accessToken,
            user: {
                name: user.name,
                birthday: user.birthday,
                phone: user.phone,
                gender: user.gender,
                avatar: user.avatar,
                email: user.email
            }
        };
    } catch (error) {
        return error;
    }
});

// sign-out
export const apiSignOut = createAsyncThunk<any>('auth/signOut', async () => {
    try {
        const response = await api.v1.auth.signOut() as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

// forgot
export const apiForgotPassword = createAsyncThunk<any, DataForgot>('auth/forgot', async (data) => {
    try {
        const response = await api.v1.auth.forgotPassword(data) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

export const apiResetPasswordByLink = createAsyncThunk<any, { linkToken: string, data: DataResetPasswordByLink }>('auth/resetPasswordByLink', async ({ linkToken, data }) => {
    try {
        const response = await api.v1.auth.resetPasswordByLink(linkToken, data) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

// reset
export const apiResetPassword = createAsyncThunk<any, { accessToken: string, data: DataResetPassword }>('auth/resetPassword', async ({ accessToken, data }) => {
    try {
        const response = await api.v1.auth.ResetPassword(accessToken, data) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});


// user
export const apiUpdateUserName = createAsyncThunk<any, { accessToken: string, name: string }>('auth/updateUserName', async ({ accessToken, name }) => {
    try {
        const response = await api.v1.auth.updateUserName(accessToken, name) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

export const apiUpdateUserBirthday = createAsyncThunk<any, { accessToken: string, birthday: string }>('auth/updateUserBirthday', async ({ accessToken, birthday }) => {
    try {
        const response = await api.v1.auth.updateUserBirthday(accessToken, birthday) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

export const apiUpdateUserPhone = createAsyncThunk<any, { accessToken: string, phone: string }>('auth/updateUserPhone', async ({ accessToken, phone }) => {
    try {
        const response = await api.v1.auth.updateUserPhone(accessToken, phone) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

export const apiUpdateUserGender = createAsyncThunk<any, { accessToken: string, gender: 'male' | 'female' }>('auth/updateUserGender', async ({ accessToken, gender }) => {
    try {
        const response = await api.v1.auth.updateUserGender(accessToken, gender) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

export const apiUpdateUserEmail = createAsyncThunk<any, { accessToken: string, email: string }>('auth/updateUserEmail', async ({ accessToken, email }) => {
    try {
        const response = await api.v1.auth.updateUserEmail(accessToken, email) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});


export const apiUpdateUserAvatar = createAsyncThunk<any, { accessToken: string, data: DataUpdateUserAvatar }>('auth/updateUserAvatar', async ({ accessToken, data }) => {
    try {
        const response = await api.v1.auth.updateUserAvatar(accessToken, data) as unknown as any;
        return {
            status: response.status
        };
    } catch (error) {
        return error;
    }
});

// slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // health
            .addCase(apiHealth.pending, (state, action) => {
                console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiHealth.fulfilled, (state, action) => {
                console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiHealth.rejected, (state, action) => {
                console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            // sign-up
            .addCase(apiSignUp.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';
            })
            .addCase(apiSignUp.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';
            })
            .addCase(apiSignUp.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';
                state.error = action.payload as AxiosError;
            })
            // sign-in
            .addCase(apiSignIn.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';
            })
            .addCase(apiSignIn.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(apiSignIn.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';
                state.error = action.payload as AxiosError;
            })
            // token
            .addCase(apiValidateToken.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';
            })
            .addCase(apiValidateToken.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';
            })
            .addCase(apiValidateToken.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';
                state.error = action.payload as AxiosError;
            })
            .addCase(apiRequestToken.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';
            })
            .addCase(apiRequestToken.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(apiRequestToken.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';
            })
            // sign-out
            .addCase(apiSignOut.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiSignOut.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiSignOut.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            // forgot
            .addCase(apiForgotPassword.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiForgotPassword.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiForgotPassword.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            .addCase(apiResetPasswordByLink.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiResetPasswordByLink.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiResetPasswordByLink.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            // reset
            .addCase(apiResetPassword.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiResetPassword.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiResetPassword.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            // user
            .addCase(apiUpdateUserName.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiUpdateUserName.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiUpdateUserName.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            .addCase(apiUpdateUserBirthday.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiUpdateUserBirthday.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiUpdateUserBirthday.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            .addCase(apiUpdateUserPhone.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiUpdateUserPhone.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiUpdateUserPhone.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            .addCase(apiUpdateUserGender.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiUpdateUserGender.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiUpdateUserGender.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            .addCase(apiUpdateUserEmail.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiUpdateUserEmail.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiUpdateUserEmail.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
            .addCase(apiUpdateUserAvatar.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';

            })
            .addCase(apiUpdateUserAvatar.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                state.status = 'succeeded';

            })
            .addCase(apiUpdateUserAvatar.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';

            })
    }
});

export default authSlice.reducer;