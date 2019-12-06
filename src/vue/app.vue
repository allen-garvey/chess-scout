<template>
    <div class="app-container">
        <search-view
            :on-form-submitted="onFormSubmitted"
            v-if="!shouldShowResults"
        >
        </search-view>
    </div>
</template>

<script>
import SearchView from './search.vue';
import { getUserGamesStats } from '../ajax';

export default {
    components: {
        SearchView,
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