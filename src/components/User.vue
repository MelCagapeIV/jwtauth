<template>
    <div>
        Name: {{ user.name }} <br />
        Email: {{ user.email }} <br />
    </div>
</template>

<script>
export default {
    name: 'User',
    props: ["user"]
}
</script>