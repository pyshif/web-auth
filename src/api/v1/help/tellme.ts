import { AxiosInstance } from "axios";
import routes from 'api/v1/routes';



function tellme(axios: AxiosInstance) {
    return {
        tellMe: (accessToken: string, feedback: string) => {
            return axios({
                method: 'POST',
                url: routes.help.tellme.POST,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: {
                    feedback
                }
            })
        }
    }
}

export default tellme;