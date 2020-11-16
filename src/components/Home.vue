<template>
    <div>
        Hello {{ name }}<br />
        Your email is {{ email }}<br />
        <button @click="logout">Logout</button>

        <Users />
    </div>
</template>
<script>
import axios from 'axios';
import Users from './Users.vue';

export default {
    name: 'Home',
    components: {
        Users
    },
    data() {
        return {
            name: '',
            email: ''
        };
    },
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
    },
    mounted() {
        const userUrl = process.env.VUE_APP_BASE_NODE_URL + process.env.VUE_APP_AUTH_PATH + '/user';
        axios.get(userUrl, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data);
                this.name = res.data.user.name;
                this.email = res.data.user.email;
            }, err => {
                console.log(err);
                this.$router.push('/login');
            });
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>