import { include } from 'named-urls';

// 1. This is 'v1' api routes/url.
// 2. This is for management api routes/url (not include baseURL)
// 3. '_' letter means path parameter. Use 'reverse()' to replace it
// 4. each url end with HTTP Method (GET, POST, DELETE, PUT, PATCH, OPTION...)

const routes = {
    auth: include('auth/', {
        health: include('health/', {
            GET: ''
        }),
        accessTokenValid: include('/', {
            GET: ''
        }),
        signUp: include('signup/', {
            POST: '',
            // _token: include(':_token/', {
            //     GET: ''
            // })
        }),
        accessTokenRefresh: include('token/', {
            GET: ''
        }),
        signIn: include('signin/', {
            POST: ''
        }),
        signOut: include('signout/', {
            DELETE: ''
        }),
        forgot: include('forgot/', {
            POST: '',
            _token: include(':_token/', {
                // GET: '',
                POST: ''
            })
        }),
        reset: include('reset-password/', {
            POST: '',
        }),
        edit: include('edit/', {
            personalInfo: include('personal-info/', {
                POST: ''
            }),
            email: include('email/', {
                POST: '',
                // _token: include(':_token/', {
                //     GET: ''
                // })
            }),
            avatar: include('avatar/', {
                POST: ''
            })
        }),
        google: include('google/', {
            signin: include('signin', {
                POST: ''
            })
        }),
    })
};

export { reverse } from 'named-urls';
export default routes;