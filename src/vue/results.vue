<template>
    <div>
        <loader v-if="isLoading" />
        <Header v-if="!isLoading" />
        <search :class="$style.search" v-if="!isLoading" />
        <div v-if="isLoaded && !userNotFound">
            <div :class="$style.header">
                <h1 :class="$style.title">Opening stats for <a :href="urlForUser(userName)" target="_blank" rel="noopener noreferrer">{{userName}}</a></h1>
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
        <div v-if="!isLoading && userNotFound">
            <h2>User {{ userName }} not found</h2>
        </div>
    </div>
</template>

<style lang="scss" module>
    .search {
        margin-bottom: 3rem;
    }
    .title {
        margin: 0;
    }
    .gameTypes {
        margin: 0.25rem 0 0;
    }
    .header {
        margin: 0 0 1rem;
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

<script lang="ts">
import { defineComponent } from 'vue';
import gameTypes from '../game-types';
import Header from './header.vue';
import MoveTree from './move-tree.vue';
import ChessBoard from './chess-board.vue';
import Loader from './loader.vue';
import Search from './search.vue';
import { getUserGamesStats, UserGameStats } from '../ajax';

export default defineComponent({
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
        Header,
        Search,
        MoveTree,
        ChessBoard,
        Loader,
    },
    created(){
        this.loadUserGames(this.userName);
    },
    beforeRouteUpdate(to, from){
        this.loadUserGames(to.params.userName);
    },
    data(){
        return {
            userGamesStats: null as UserGameStats|null,
            moves: [],
            isWhiteSelected: null,
            isLoading: true,
            userNotFound: false,
        };
    },
    computed: {
        isLoaded(){
            return !this.isLoading && this.userGamesStats;
        },
        gameTypesTitle(){
            return this.gameTypes.split(',')
            .map(key => {
                const gameType = gameTypes().find(gameType => gameType.key === key);
                return gameType ? gameType.title : '';
            })
            .filter(s => s)
            .join(', ');
        },
    },
    methods: {
        loadUserGames(userName){
            this.isLoading = true;
            this.moves = [];
            this.isWhiteSelected = null;
            getUserGamesStats(userName, this.gameTypes).then((stats)=>{
                this.userGamesStats = stats;
                this.isLoading = false;
                this.userNotFound = false;
            }).catch(() => {
                this.isLoading = false;
                this.userNotFound = true;
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
});
</script>