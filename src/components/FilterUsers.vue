<template>
    <div>
        Filter Users:
        <select @change="readyFetchUsers($event)">
            <option v-for="filterOption in filterOptions" :key="filterOption.value" v-bind:value="filterOption.value">{{ filterOption.text }}</option>
        </select>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "FilterUsers",
    data() {
        return {
            filterOptions: [
                {
                    value: "0",
                    text: "All"
                },
                {
                    value: "10",
                    text: "10"
                },
                {
                    value: "5",
                    text: "5"
                },
                {
                    value: "1",
                    text: "1"
                }
            ]
        };
    },
    methods: {
        ...mapActions(['fetchUsers']),
        readyFetchUsers(e) {
            this.fetchUsers(e.target.options[e.target.options.selectedIndex].innerText);
        }
    }
}
</script>

<style scoped>

</style>