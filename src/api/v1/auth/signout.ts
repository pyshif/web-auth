import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

// response
export type ResponseSignOut = {
    headers: {
        status: string | '403' | '401' | '204';
    }
};

// axios
function signOut(axios: AxiosInstance) {
    return {
        signOut: () => {
            return axios({
                method: 'DELETE',
                url: routes.auth.signOut.DELETE,
                withCredentials: true,
            })
        }
    }
}

export default signOut;