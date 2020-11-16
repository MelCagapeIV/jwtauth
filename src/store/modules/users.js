import axios from 'axios';

const state = {
    users: []
};

const getters = {
    allUsers: state => state.users
    };

const actions = {
    async fetchUsers({ commit }) {
        const userUrl = process.env.VUE_APP_BASE_NODE_URL + process.env.VUE_APP_AUTH_PATH + '/all';
        const response = await axios.get(userUrl, { headers: { 'token': localStorage.getItem('token') }});

        commit('setUsers', response.data.users);
    },
    async deleteUser({ commit }, email) {
        const userUrl = process.env.VUE_APP_BASE_NODE_URL + process.env.VUE_APP_AUTH_PATH + `/delete/${email}`;
        await axios.delete(userUrl, { headers: { 'token': localStorage.getItem('token') }});

        commit('removeUser', email);
    }
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    removeUser: (state, email) => (state.users = state.users.filter(user => user.email !== email))
};

export default {
    state,
    getters,
    actions,
    mutations
}