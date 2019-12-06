<template>
    <div class="app-container">
        <search-view
            :on-form-submitted="onFormSubmitted"
            v-if="!shouldShowResults"
        >
        </search-view>
        <results-view
            :user-name="userName"
            :user-games-stats="userGamesStats"
            v-if="shouldShowResults"
        >
        </results-view>
    </div>
</template>

<script>
import { getUserGamesStats } from '../ajax';

import SearchView from './search.vue';
import ResultsView from './results.vue';

export default {
    components: {
        SearchView,
        ResultsView,
    },
    data(){
        return {
            shouldShowResults: false,
            userName: '',
            userGamesStats: null,
        };
    },
    computed: {
    },
    methods: {
        onFormSubmitted(userName){
            this.userName = userName;
            getUserGamesStats(this.userName).then((stats)=>{
                this.userGamesStats = stats;
                this.shouldShowResults = true;
            });
        },
    }
};
</script>