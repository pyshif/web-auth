import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';
import { RevocationResponse } from 'google-one-tap';

declare global {
    const google: typeof import('google-one-tap');
}

// response
export type ResponseGoogle = {
    headers: {
        status: string | '403' | '200';
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
function gsi(axios: AxiosInstance) {
    return {
        googleSignIn: (googleIDToken: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.google.popup.POST,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${googleIDToken}`,
                }
            });
        },
        googleSignOut: (hint: string) => {
            // hint is email or payload.sub
            const res = google.accounts.id.disableAutoSelect();
            // console.log('res :>> ', res);
            google.accounts.id.revoke(hint, (done: RevocationResponse) => {
                // console.log('done :>> ', done);
                const { error, successful } = done;
                if (error) return console.log('google revoke error :>>', error);
                // console.log('google revoke success!',)
            })
        }
    }
}

export default gsi;