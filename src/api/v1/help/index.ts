import { AxiosInstance } from "axios";
import tellme from './tellme';

function help(axios: AxiosInstance) {

    const apiTellMe = tellme(axios);

    return {
        ...apiTellMe
    }
}

export default help;