<template>
    <div class="results-container" v-if="userGamesStats">
        <h2>Opening stats for <a :href="urlForUser(userName)" target="_blank" rel="noopener">{{userName}}</a></h2>
        <chess-board></chess-board>
        <move-tree
            title="White"
            :tree="userGamesStats.moveTrees.white"
        >
        </move-tree>
        <move-tree
            title="Black"
            :tree="userGamesStats.moveTrees.black"
        >
        </move-tree>
        <stats
            title="First Move Stats"
            :stats="userGamesStats.firstMoveStats"
        >
        </stats>
        <stats
            title="Opening Stats Condensed"
            :stats="userGamesStats.openingStatsCondensed"
        >
        </stats>
        <stats
            title="Opening Stats"
            :stats="userGamesStats.openingStats"
        >
        </stats>
    </div>
</template>

<script>
import Stats from './stats.vue';
import MoveTree from './move-tree.vue';
import ChessBoard from './chess-board.vue';
import { getUserGamesStats } from '../ajax';

export default {
    props: {
        userName: {
            type: String,
            required: true,
        },
    },
    components: {
        Stats,
        MoveTree,
        ChessBoard,
    },
    created(){
        this.loadUserGames();
    },
    beforeRouteUpdate(){
        this.loadUserGames();
    },
    data(){
        return {
            userGamesStats: null,
        };
    },
    computed: {
    },
    methods: {
        loadUserGames(){
            getUserGamesStats(this.userName).then((stats)=>{
                this.userGamesStats = stats;
            });
        },
        urlForUser(userName){
            return `https://lichess.org/@/${encodeURIComponent(userName)}`;
        },
    }
};
</script>