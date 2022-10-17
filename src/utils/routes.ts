import { include } from 'named-urls';

const routes = {
    home: '/',
    auth: include('/auth', {
        self: '',
        signin: 'signin/',
        signup: 'signup/',
        forgot: 'forgot/',
        reset: include('reset/', {
            self: '',
            resetId: ':resetId/'
        })
    }),
    user: '/user'
}

export default routes;