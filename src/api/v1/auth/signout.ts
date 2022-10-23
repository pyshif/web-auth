import routes from 'api/v1/routes';
import { AxiosInstance } from 'axios';

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