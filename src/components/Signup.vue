<template>
    <div>
        NAME: <input type="text" v-model="name" /><br />
        EMAIL: <input type="text" v-model="email" /><br />
        PASSWORD: <input type="password" v-model="password" /><br />
        <button @click="signup">Signup</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Signup',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup() {
            let newUser = {
                name: this.name,
                email: this.email,
                password: this.password
            };

            const serverUrl = process.env.VUE_APP_BASE_NODE_URL + process.env.VUE_APP_AUTH_PATH + '/signup';

            axios.post(serverUrl, newUser)
                .then(res => {
                    console.log(res);
                });
        }
    }
}
</script>