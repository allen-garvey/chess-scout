<template>
    <div class="search-container">
        <form @submit.prevent="submitAction()">
            <label>Lichess User Name<input type="search" v-model="userNameInput" /></label>
            <input type="submit" value="Submit" />
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userNameInput: '',
        };
    },
    methods: {
        submitAction(){
            this.$emit('form-submitted', this.userNameInput);
        },
    }
};
</script>