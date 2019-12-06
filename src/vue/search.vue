<template>
    <div class="search-container">
        <label>Lichess User Name<input type="search" v-model="userNameInput" /></label>
        <button @click="submitAction()">Submit</button>
    </div>
</template>

<script>
export default {
    props: {
        onFormSubmitted: {
            type: Function,
            required: true,
        },
    },
    data(){
        return {
            userNameInput: '',
        };
    },
    methods: {
        submitAction(){
            this.onFormSubmitted(this.userNameInput);
        },
    }
};
</script>