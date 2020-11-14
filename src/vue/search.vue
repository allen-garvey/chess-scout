<template>
    <div class="search-container">
        <form @submit.prevent="submitAction()">
            <label>Lichess User Name<input type="search" v-model="userNameInput" v-focus /></label>
            <input type="submit" value="Submit" />
        </form>
    </div>
</template>

<script>
import focus from './directives/focus';

export default {
    directives: {
        focus,
    },
    data(){
        return {
            userNameInput: '',
        };
    },
    methods: {
        submitAction(){
            const userName = this.userNameInput;
            this.$router.push({ name: 'userShow', params: { userName }});
        },
    }
};
</script>