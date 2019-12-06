<template>
    <div class="results-container">
        <h2>Opening stats for {{userName}}</h2>
        <fist-move-stats
            :stats="userGamesStats.firstMoveStats"
        >
        </fist-move-stats>
    </div>
</template>

<script>
import FistMoveStats from './first-move-stats.vue';

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
        FistMoveStats,
    },
    data(){
        return {
        };
    },
    computed: {
    },
    methods: {
    }
};
</script>