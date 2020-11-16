<template>
    <div>
        EMAIL: <input type="text" v-model="email" /> <br />
        PASSWORD: <input type="password" v-model="password" /> <br />
        <button @click="handleLogin()">Log-in</button> <br />
        {{ error }}
    </div>
</template>
<script>

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        handleLogin() {
            this.$store.dispatch('LOGIN', {
                email: this.email,
                password: this.password
            })
            .then(success => {
                console.log(success);
                this.$router.push('/Home');
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>