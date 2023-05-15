const root = '/api';

module.exports = {
    root: root,

    auth: {
        user: `${root}/auth`,
        login: `${root}/auth/login`,
        logout: `${root}/auth/logout`,
    },
    user: {
        resource: `${root}/user`,
        update(id) {
            return `${root}/user/${id}`
        },
        rating: {
            resource: `${root}/user/rate`,
        }
    },
    singers: {
        new: `${root}/singers/new`,
        all: `${root}/singers/all`,
        top: `${root}/singers/top`,
    },
};
