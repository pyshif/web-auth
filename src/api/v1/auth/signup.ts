import { AxiosInstance } from 'axios';
import routes from 'api/v1/routes';
import { reverse } from 'named-urls';

// request payload
export type DataSignUp = {
    name: string,
    account: string,
    password: string,
    confirm_password: string,
    hint: string,
};

// response payload
export type ResponseSignUp = {
    headers: {
        status: string | '403' | '401' | '400' | '200';
    }
};

// axios
function signUp(axios: AxiosInstance) {
    return {
        signUp: (data: DataSignUp) => {
            // console.log('routes.auth.signUp.POST :>> ', routes.auth.signUp.POST);
            return axios({
                method: 'POST',
                url: routes.auth.signUp.POST,
                data
            })
        },
        // This is unuseful for fronted, just example
        // signUpConfirm: (_token: string) => {
        //     // console.log('reverse(routes.auth.signUp._token.GET, {_token}) :>> ', reverse(routes.auth.signUp._token.GET, { _token }));
        //     return axios({
        //         method: 'GET',
        //         url: reverse(routes.auth.signUp._token.GET, { _token })
        //     });
        // }
    }
}

export default signUp;