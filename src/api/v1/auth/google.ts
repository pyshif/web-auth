import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

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
function google(axios: AxiosInstance) {
    return {
        googleSignIn: (googleIDToken: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.google.POST,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${googleIDToken}`,
                }
            });
        },
    }
}

export default google;