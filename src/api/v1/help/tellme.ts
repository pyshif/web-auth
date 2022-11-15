import { AxiosInstance } from "axios";
import routes from 'api/v1/routes';



function tellme(axios: AxiosInstance) {
    return {
        tellMe: (feedback: string) => {
            return axios({
                method: 'POST',
                url: routes.help.tellme.POST,
                data: {
                    feedback
                }
            })
        }
    }
}

export default tellme;