import axios from 'axios';

const state = {
    user: {
        email: '',
        name: ''
    },
    loginStatus: {
        statusCode: 401,
        message: ''
    }
};

const getters = {
    getUserName: state => state.user.name,
    getUserEmail: state => state.user.email
};

const actions = {
    LOGIN: ({ commit }, user) => {
        
        return new Promise((resolve, reject) => {
            const loginUrl = process.env.VUE_APP_AUTH_PATH + '/login';

            axios.post(loginUrl, user)
                .then(({ data, status }) => {
                    if (status === 200) {
                        localStorage.setItem('token', data.token);
                        commit('storeUser', user);
                        commit('storeLoginStatus', {statusCode: 200, message: 'Login Successful'});
                        resolve(true);
                    }
                })
                .catch((data, err) => {
                    localStorage.clear();
                    commit('storeUser', user);
                    commit('storeLoginStatus', {statusCode: status, message: data.title});
                    reject(err);
                });
        });   
    }
};

const mutations = {
    storeUser: (state, user) => (state.user = user),
    storeLoginStatus: (state, loginStatus) => (state.loginStatus = loginStatus)
};

export default {
    state,
    getters,
    actions,
    mutations
}