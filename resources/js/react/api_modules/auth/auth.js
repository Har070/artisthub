import api_routes from '../../routes/api';

export function getAuthUser() {
    return new Promise((resolve, reject) => {
        let token = cookie.get('access_token');

        if (!token) {
            let data = {
                success: 0,
                user: null
            };

            resolve(data)
        } else {
            axios.get(api_routes.auth.user)
                .then(response => {
                    resolve(response.data)
                })
                .catch(() => {
                    reject()
                })
        }
    })
}

export function login(email, password) {
    return new Promise((resolve, reject) => {
        let data = {
            email: email,
            password: password
        };

        axios.post(api_routes.auth.login, data).then(response => {
            if (response.data.success) {
                cookie.set('access_token', response.data.access_token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookie.get('access_token');

                resolve(response.data)
            } else {
                reject(response.data)
            }
        }).catch(error => {
            reject(error.response.data);
        })
    });
}

export function logOut() {
    return new Promise((resolve, reject) => {
        axios.get(api_routes.auth.logout).then(response => {
            if (response.data.success) {
                cookie.remove('access_token');
                resolve(response.data)
            } else {
                reject(response.data)
            }
        }).catch(error => {
            reject(error.response.data)
        })
    });
}
