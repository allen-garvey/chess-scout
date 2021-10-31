<template>
    <div :class="$style.container" v-if="topPlayers">
        <h2 :class="$style.title">Top Players</h2>
        <div :class="$style.gameTypes">
            <div 
                :class="$style.gameType"
                v-for="gameType in gameTypes" 
                :key="gameType"
            >
                <h3 :class="$style.gameTypeTitle">{{ capitalize(gameType) }}</h3>
                <ol :class="$style.playerList">
                    <li v-for="player in topPlayers[gameType]" :key="player.id">
                        <span :class="$style.playerTitle">{{ player.title ? `${player.title}` : '' }}</span>
                        <router-link :to="{ name: 'userShow', params: { userName: player.id }, query: { gameTypes: gameType } }">{{ player.username }}</router-link>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    margin-top: 1.5rem;
}
.title{
    font-size: 2.05rem;
    margin: 0 0 1rem;
}
.gameTypes {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.5rem;
}
.playerList {
    padding-left: 1em;
    margin: 0;
}
.gameType {
    margin: 0 2rem 2rem 0;
}
.gameTypeTitle {
    margin: 0 0 0.5rem;
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
        capitalize(s){
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
    }
});
</script>