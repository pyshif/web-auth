import { AxiosInstance } from "axios";
import routes from 'api/v1/routes';

// response data type
export type DataResponseRequestToken = {
    accessToken: string;
};


function token(axios: AxiosInstance) {
    return {
        validateToken: (accessToken: string) => {
            return axios({
                method: 'GET',
                url: routes.auth.token.GET,
                withCredentials: true,
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        },
        requestToken: () => {
            return axios({
                method: 'GET',
                url: routes.auth.token.new.GET,
                withCredentials: true,
            })
        }
    }
}

export default token;