<template>
    <div class="app-container">
        <router-view @form-submitted="onFormSubmitted"/>
    </div>
</template>

<script>
export default {
    components: {
    },
    data(){
        return {
        };
    },
    computed: {
    },
    methods: {
        onFormSubmitted(userName){
            this.$router.push({ name: 'userShow', params: { userName }});
        },
    }
};
</script>