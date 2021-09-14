import SearchView from './vue/search.vue';
import ResultsView from './vue/results.vue';

export default {
    routes: [
        {
            path: '/',
            name: 'home',
            component: SearchView,
        },
        {
            path: '/u/:userName',
            name: 'userShow',
            component: ResultsView,
            props: (route) => {
                const props = {
                    userName: route.params.userName,
                    gameTypes: route.query.gameTypes,
                }; 
                return props;
            },
        }
    ],
};