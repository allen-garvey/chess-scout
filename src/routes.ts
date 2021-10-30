import { RouteRecordRaw } from 'vue-router';
import Homepage from './vue/homepage.vue';
import ResultsView from './vue/results.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Homepage,
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
];

export default {
    routes,
};