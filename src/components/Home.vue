<template>
    <div>
        <div class="vue-expand-panel">
            <expandPanel :title="Menu">
                <div class="header">
                    <div class="greeting">
                        <div>
                            Hello {{ name }}
                        </div>
                        <div>
                            Your email is {{ email }}
                        </div>
                        <div>
                            <button @click="logout">Logout</button>
                        </div>
                    </div>
                    <div class="signup">
                        <Signup />
                    </div>
                </div>
            </expandPanel>
        </div>
        <div class="users">
            <Users />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Users from './Users';
import Signup from './Signup';
import { expandPanel } from 'vue-expand-panel';
import 'vue-expand-panel/dist/vue-expand-panel.css';

export default {
    name: 'Home',
    components: {
        Users,
        Signup,
        expandPanel
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
        const userUrl = process.env.VUE_APP_AUTH_PATH + '/user';
        axios.get(userUrl, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
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

<style scoped>
.header {
    display: flex;
    flex-direction: row;
}

.greeting {
    flex-grow: 1;
}

.signup {
    flex-grow: 1;
}

</style>