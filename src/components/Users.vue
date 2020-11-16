<template>
    <div>
        <h3>Users</h3>
        
        <div v-bind:key="user.id" v-for="user in users">
            <User v-bind:user="user" /> 
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import User from './User';


export default {
    name: 'Users',
    components: {
        User
    },
    data() {
        return {
            users: []
        };
    },
    mounted() {
        const userUrl = process.env.VUE_APP_BASE_NODE_URL + process.env.VUE_APP_AUTH_PATH + '/all';
        axios.get(userUrl, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data);
                this.users = res.data.users;
            }, err => {
                console.log(err);
                this.$router.push('/login');
            });
    }
}
</script>