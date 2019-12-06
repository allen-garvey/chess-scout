import Vue from 'vue'
import App from './vue/app.vue'

(function(){
    new Vue({
        el: document.getElementById('app'),
        render: h => h(App),
    });
})();