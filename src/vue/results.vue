<template>
    <div class="container" v-if="userGamesStats">
        <h2>Opening stats for <a :href="urlForUser(userName)" target="_blank" rel="noopener">{{userName}}</a></h2>
        <chess-board :moves="moves"></chess-board>
        <move-tree
            title="White"
            :tree="userGamesStats.moveTrees.white"
            @treeUpdated="moveTreeUpdated"
        >
        </move-tree>
        <move-tree
            title="Black"
            :tree="userGamesStats.moveTrees.black"
            @treeUpdated="moveTreeUpdated"
        >
        </move-tree>
    </div>
</template>

<script>
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
            moves: [],
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
        moveTreeUpdated(moves){
            this.moves = moves;
        },
    }
};
</script>