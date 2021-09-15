<template>
    <div class="container">
        <loader v-if="isLoading" />
        <div v-if="userGamesStats">
            <h2>Opening stats for <a :href="urlForUser(userName)" target="_blank" rel="noopener">{{userName}}</a></h2>
            <chess-board :moves="moves"></chess-board>
            <move-tree
                title="White"
                :tree="userGamesStats.moveTrees.white"
                @treeUpdated="(moves) => moveTreeUpdated(moves, true)"
                v-if="isWhiteSelected === true || isWhiteSelected === null"
            >
            </move-tree>
            <move-tree
                title="Black"
                :tree="userGamesStats.moveTrees.black"
                @treeUpdated="(moves) => moveTreeUpdated(moves, false)"
                v-if="isWhiteSelected === false || isWhiteSelected === null"
            >
            </move-tree>
        </div>
    </div>
</template>

<script>
import MoveTree from './move-tree.vue';
import ChessBoard from './chess-board.vue';
import Loader from './loader.vue';
import { getUserGamesStats } from '../ajax';

export default {
    props: {
        userName: {
            type: String,
            required: true,
        },
        gameTypes: {
            type: String,
            default: '',
        },
    },
    components: {
        MoveTree,
        ChessBoard,
        Loader,
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
            isWhiteSelected: null,
            isLoading: true,
        };
    },
    computed: {
    },
    methods: {
        loadUserGames(){
            this.isLoading = true;
            getUserGamesStats(this.userName, this.gameTypes).then((stats)=>{
                this.userGamesStats = stats;
                this.isLoading = false;
            });
        },
        urlForUser(userName){
            return `https://lichess.org/@/${encodeURIComponent(userName)}`;
        },
        moveTreeUpdated(moves, isWhite){
            this.moves = moves;
            if(moves.length === 0){
                this.isWhiteSelected = null;
            }
            else{
                this.isWhiteSelected = isWhite;
            }
        },
    }
};
</script>