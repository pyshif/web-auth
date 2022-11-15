import { AxiosInstance } from "axios";
import routes from 'api/v1/routes';



function tellme(axios: AxiosInstance) {
    return {
        tellMe: (message: string) => {
            return axios({
                method: 'POST',
                url: routes.auth.help.tellme.POST,
                data: {
                    message
                }
            })
        }
    }
}

export default tellme;