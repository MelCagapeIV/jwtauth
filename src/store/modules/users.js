
const state = {
    users: [
        {
            name: '1stname',
            email: '1stemail'
        },
        {
            name: '2ndname',
            email: '2ndemail'
        }
    ]
};

const getters = {
    allUsers: state => state.users
    };

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
}