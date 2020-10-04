import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './vue/app.vue';
import routes from './routes';

const app = createApp(App);
const router = createRouter({...routes, history: createWebHistory()});
app.use(router);
app.mount('#app');