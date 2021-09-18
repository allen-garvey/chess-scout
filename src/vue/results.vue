<template>
    <div class="container">
        <loader v-if="isLoading" />
        <div v-if="userGamesStats">
            <div :class="$style.header">
                <h2 :class="$style.title">Opening stats for <a :href="urlForUser(userName)" target="_blank" rel="noopener">{{userName}}</a></h2>
                <div :class="$style.gameTypes" v-if="gameTypesTitle">{{ gameTypesTitle }}</div>
            </div>
            <div :class="$style.content">
                <chess-board :moves="moves"/>
                <div :class="$style.moveTrees">
                    <move-tree
                        title="White"
                        :tree="userGamesStats.moveTrees.white"
                        @treeUpdated="(moves) => moveTreeUpdated(moves, true)"
                        v-if="isWhiteSelected === true || isWhiteSelected === null"
                    />
                    <move-tree
                        title="Black"
                        :tree="userGamesStats.moveTrees.black"
                        @treeUpdated="(moves) => moveTreeUpdated(moves, false)"
                        v-if="isWhiteSelected === false || isWhiteSelected === null"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .title {
        margin: 0;
    }
    .gameTypes {
        margin: 0.25rem 0 0;
    }
    .header {
        margin: 0 0 2rem;
    }
    .moveTrees {
        margin: 1.5rem 0 0;
    } 
    
    @media screen and (min-width: 900px) {
        .content {
            display: flex;
        }

        .moveTrees {
            margin: 0 0 0 1rem;
        }        
    }
</style>

<script>
import gameTypes from '../game-types';
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
        gameTypesTitle(){
            return this.gameTypes.split(',')
            .map(key => {
                const gameType = gameTypes.find(gameType => gameType.key === key);
                return gameType ? gameType.title : '';
            })
            .filter(s => s)
            .join(', ');
        },
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