<template>
    <div>
        Hello {{ name }}<br />
        Your email is {{ email }}<br />
        <button @click="logout">Logout</button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Home',
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
        const userUrl = process.env.VUE_APP_BASE_NODE_URL + '/user';
        axios.get(userUrl, { header: { token: localStorage.getItem('token') } })
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