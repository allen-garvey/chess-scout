<template>
    <div :class="$style.container" v-if="topPlayers">
        <h2>Top Players</h2>
        <div v-for="gameType in gameTypes" :key="gameType">
            <h3>{{ gameType }}</h3>
            <ol>
                <li v-for="player in topPlayers[gameType]" :key="player.id">
                    <span :class="$style.playerTitle">{{ player.title ? `${player.title}` : '' }}</span>
                    <router-link :to="{ name: 'userShow', params: { userName: player.id }, query: { gameTypes: gameType } }">{{ player.username }}</router-link>
                </li>
            </ol>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {

}
.playerTitle {
    display: inline-block;
    min-width: 2em;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { getTopPlayers, Player } from '../ajax';

export default defineComponent({
    created(){
        getTopPlayers().then(topPlayers => {
            this.topPlayers = topPlayers;
        });
    },
    data(){
        return {
            topPlayers: null as null|Record<string, Array<Player>>
        };
    },
    computed: {
        gameTypes(){
            return ['bullet', 'blitz', 'rapid', 'classical'];
        },
    },
    methods: {
    }
});
</script>