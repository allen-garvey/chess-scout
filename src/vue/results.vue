<template>
    <div class="results-container">
        <h2>Opening stats for <a :href="urlForUser(userName)" target="_blank" rel="noopener">{{userName}}</a></h2>
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

export default {
    props: {
        userName: {
            type: String,
            required: true,
        },
        userGamesStats: {
            type: Object,
            required: true,
        },
    },
    components: {
        Stats,
        MoveTree,
    },
    data(){
        return {
        };
    },
    computed: {
    },
    methods: {
        urlForUser(userName){
            return `https://lichess.org/@/${encodeURIComponent(userName)}`;
        }
    }
};
</script>