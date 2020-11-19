<template>
    <div>
        <h3>Users</h3>
        <FilterUsers />
        <div class="users">
            <div v-for="user in allUsers" :key="user.email" class="user">
                {{ user.email }} <br />
                {{ user.name }}
                <i @click="deleteUser(user.email)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
import FilterUsers from './FilterUsers';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Users',
    components: {
        FilterUsers
    },
    methods: {
        ...mapActions(['fetchUsers', 'deleteUser'])
    },
    computed: mapGetters(['allUsers']),
    mounted() {
        this.fetchUsers(0);
    }
}
</script>

<style scoped>
.users {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}

.user {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}

i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}
</style>