<template>
    <div class="container">
        <form @submit.prevent="submitAction()">
            <label>Lichess User Name<input type="search" class="form-control" v-model="userNameInput" v-focus /></label>
            <div :class="$style.checkboxContainer">
                <template v-for="gameType in gameTypes" :key="gameType.key">
                    <input 
                        :id="gameTypeId(gameType)"
                        type="checkbox"
                        class="form-check-input"
                        v-model="gameType.isChecked" 
                    />
                    <label :class="$style.label" :for="gameTypeId(gameType)">{{ gameType.title }}</label>
                </template>
            </div>
            <div :class="$style.buttonContainer">
                <input class="btn btn-primary" type="submit" value="Submit" :disabled="!userNameInput" />
            </div>
        </form>
    </div>
</template>

<style lang="scss" module>
    .checkboxContainer {
        margin: 1rem 0 0.5rem;
    }
    .label {
        cursor: pointer;
        margin-right: 0.5em;
    }
    .buttonContainer {
        display: flex;
        justify-content: flex-end;
    }
</style>

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