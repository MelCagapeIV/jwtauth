<template>
    <div>
        EMAIL: <input type="text" v-model="email" /> <br />
        PASSWORD: <input type="password" v-model="password" /> <br />
        <button @click="login">Log-in</button> <br />
        {{ error }}
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',

            error: '',
        }
    },
    methods: {
        login() {
            let user = {
                email: this.email,
                password: this.password
            };

            const serverUrl = process.env.VUE_APP_BASE_NODE_URL + process.env.VUE_APP_AUTH_PATH + '/login';

            console.log(serverUrl);
            axios.post(serverUrl, user)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/Home');
                    }
                },
                err => {
                    console.log(err);
                    this.error = err;
                });
        }
    }
}
</script>