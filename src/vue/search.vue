<template>
    <div class="search-container">
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
import focus from './directives/focus';

const gameTypes = [
    {
        title: 'Ultra Bullet',
        key: 'ultraBullet',
        isChecked: true,
    },
    {
        title: 'Bullet',
        key: 'bullet',
        isChecked: true,
    },
    {
        title: 'Blitz',
        key: 'blitz',
        isChecked: true,
    },
    {
        title: 'Rapid',
        key: 'rapid',
        isChecked: true,
    },
    {
        title: 'Classical',
        key: 'classical',
        isChecked: true,
    },
];

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