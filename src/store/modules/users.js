import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_NODE_URL;

const state = {
    users: [],
    currentLimit: 0
};

const getters = {
    allUsers: state => state.users,
    getCurrentLimit: state => state.currentLimit
    };

const actions = {
    async fetchUsers({ commit }, limit) {
        const userUrl = process.env.VUE_APP_AUTH_PATH + '/all' + 
        (limit === null ? '/0' : `/${limit}` );
        const response = await axios.get(userUrl, { headers: { 'token': localStorage.getItem('token') }});

        commit('setUsers', response.data.users);
        commit('setCurrentLimit', limit);
    },
    async deleteUser({ commit }, email) {
        const userUrl = process.env.VUE_APP_AUTH_PATH + `/delete/${email}`;
        await axios.delete(userUrl, { headers: { 'token': localStorage.getItem('token') }});

        commit('removeUser', email);
    },
    SIGNUP: ({ commit }, user) => {

        return new Promise((resolve, reject) => {
            const signupUrl = process.env.VUE_APP_AUTH_PATH + '/signup';

            axios.post(signupUrl, user)
                .then( async () => {
                    const userUrl = process.env.VUE_APP_AUTH_PATH + '/all' + `/${getters.getCurrentLimit}`;
                    const response = await axios.get(userUrl, { headers: { 'token': localStorage.getItem('token') }});

                    commit('setUsers', response.data.users);
                    resolve(true);
                })
                .catch((data, err) => {
                    console.log(data);
                    reject(err);
                });
        });
    }
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    removeUser: (state, email) => (state.users = state.users.filter(user => user.email !== email)),
    setCurrentLimit: (state, limit) => (state.currentLimit = limit)
};

export default {
    state,
    getters,
    actions,
    mutations
}