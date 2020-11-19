<template>
    <div class="signup">
        <Loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"></loading>
        <div class="inputs-container">
            <div class="row">
                <div class="label-column">
                    NAME:
                </div>
                <div class="input-column">
                    <input type="text" v-model="name" />
                </div>
            </div>
            <div class="row">
                <div class="label-column">
                    EMAIL:
                </div>
                <div class="input-column">
                    <input type="text" v-model="email" />
                </div>
            </div>
            <div class="row">
                <div class="label-column">
                    PASSWORD:
                </div>
                <div class="input-column">
                    <input type="password" v-model="password" />
                </div>
            </div>
        </div>
        <div class="button">
            <button @click="signup">Add</button>
        </div>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'Signup',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    methods: {
        signup() {
            this.isLoading = true;
            this.$store.dispatch('SIGNUP', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then(success => {
                this.name = '';
                this.email = '';
                this.password = '';
                this.isLoading = false;
                console.log(success);
            })
            .catch(err => {
                this.isLoading = false;
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
.signup {
    display: flex;
    flex-direction: row;
}

.inputs-container {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

.label-column {
    display: flex;
    flex-grow: 1;
    width: 30%;
    justify-content: flex-end;
    padding-right: 5px;
}

.input-column {
    display: flex;
    flex-grow: 1;
}

.button {
    display: flex;
    flex-grow: 1;
    flex-flow: row wrap;
}
</style>