import { include } from 'named-urls';

const routes = {
    home: '/',
    auth: include('/auth', {
        self: '',
        signin: 'signin/',
        signup: 'signup/',
        forgot: 'forgot/',
        reset: 'reset/'
    }),
}

export default routes;