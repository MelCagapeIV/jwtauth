<template>
    <div class="login-container">
        <Loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"></loading>
        <div class="">
            <div class="input-label">
                EMAIL:
            </div>
            <div>
                <input class="input" type="text" v-model="email" />
            </div>
        </div>
        <div>
            <div class="input-label">
                PASSWORD:
            </div>
            <div>
                <input class="input" type="password" v-model="password" />
            </div>
        </div>
        <div>
            <button class="btn" @click.prevent="handleLogin()">Log-in</button>
            {{ error }}
        </div>    
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: '',
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    methods: {
        handleLogin() {
            this.isLoading = true;

            this.$store.dispatch('LOGIN', {
                email: this.email,
                password: this.password
            })
            .then(success => {
                this.isLoading = false;
                console.log(success);
                this.$router.push('/Home');
            })
            .catch(err => {
                this.isLoading = false;
                console.log(err);
            });
        }
    }
}
</script>