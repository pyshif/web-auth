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
        signUp: include('signup/', {
            POST: '',
            // for unit testing
            _token: include(':_token/', {
                GET: ''
            })
        }),
        signIn: include('signin/', {
            POST: ''
        }),
        google: include('google/', {
            popup: include('popup/', {
                POST: ''
            }),
            redirect: include('redirect/', {
                POST: ''
            })
        }),
        token: include('token/', {
            GET: '',
            new: include('new/', {
                GET: ''
            }),
        }),
        signOut: include('signout/', {
            DELETE: ''
        }),
        forgot: include('forgot/', {
            POST: '',
            _token: include(':_token/', {
                POST: ''
            })
        }),
        reset: include('reset/', {
            POST: '',
        }),
        user: include('user/', {
            DELETE: '',
            name: include('name/', {
                POST: ''
            }),
            birthday: include('birthday/', {
                POST: ''
            }),
            phone: include('phone/', {
                POST: ''
            }),
            gender: include('gender/', {
                POST: ''
            }),
            email: include('email/', {
                POST: '',
                _token: include(':_token/', {
                    GET: '',
                })
            }),
            avatar: include('avatar/', {
                POST: ''
            })
        }),
    }),

    help: include('help/', {
        tellme: include('tellme/', {
            POST: ''
        })
    })
};

export { reverse } from 'named-urls';
export default routes;