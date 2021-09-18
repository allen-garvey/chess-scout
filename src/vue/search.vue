<template>
    <div class="container">
        <form @submit.prevent="submitAction()">
            <label>Lichess User Name<input type="search" v-model="userNameInput" v-focus /></label>
            <div>
                <template v-for="gameType in gameTypes" :key="gameType.key">
                    <input :id="gameTypeId(gameType)" type="checkbox" v-model="gameType.isChecked" />
                    <label :for="gameTypeId(gameType)">{{ gameType.title }}</label>
                </template>
            </div>
            <input type="submit" value="Submit" :disabled="!userNameInput" />
        </form>
    </div>
</template>

<script>
import gameTypes from '../game-types';
import focus from './directives/focus';

export default {
    directives: {
        focus,
    },
    data(){
        return {
            userNameInput: '',
            gameTypes,
        };
    },
    methods: {
        submitAction(){
            const userName = this.userNameInput;
            const gameTypesQuery = this.gameTypes
                .filter(gameType => gameType.isChecked)
                .map(gameType => gameType.key)
                .join(',');
            this.$router.push({ name: 'userShow', params: { userName }, query: { gameTypes: gameTypesQuery }});
        },
        gameTypeId(gameType){
            return `${gameType.key}_checkbox_id`;
        },
    }
};
</script>