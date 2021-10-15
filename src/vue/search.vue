<template>
    <div>
        <form @submit.prevent="submitAction()">
            <div :class="$style.searchContainer">
                <label :class="$style.searchLabel">Lichess User Name<input 
                    type="search" 
                    class="form-control"
                    placeholder="EricRosen"  
                    v-model="userNameInput" 
                    v-focus /></label>
                <input 
                    :class="[$style.button, 'btn',  'btn-primary']" 
                    type="submit" 
                    value="Submit"
                    :disabled="!userNameInput" 
                />
            </div>
            <div :class="$style.checkboxContainer">
                <div v-for="gameType in gameTypes" :key="gameType.key">
                    <input 
                        :id="gameTypeId(gameType)"
                        type="checkbox"
                        class="form-check-input"
                        v-model="gameType.isChecked" 
                    />
                    <label :class="$style.label" :for="gameTypeId(gameType)">{{ gameType.title }}</label>
                </div>
            </div>
        </form>
    </div>
</template>

<style lang="scss" module>
    .searchContainer {
        display: flex;
    }
    .searchLabel {
        flex-grow: 1;
        margin-right: 1rem;
    }
    .checkboxContainer {
        display: flex;
        flex-wrap: wrap;
        margin: 0.5rem 0 0;
    }
    .label {
        cursor: pointer;
        margin-right: 0.5em;
    }
    .button {
        align-self: flex-end;
        height: 100%;

        &:disabled {
            cursor: not-allowed;
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import gameTypes from '../game-types';
import focus from './directives/focus';

export default defineComponent({
    directives: {
        focus,
    },
    data(){
        return {
            userNameInput: '',
            gameTypes: gameTypes(),
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
});
</script>