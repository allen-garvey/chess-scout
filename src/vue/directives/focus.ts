import { Directive } from 'vue';

//from https://stackoverflow.com/questions/34941829/setting-focus-of-an-input-element-in-vue-js
//usage: <input v-focus>

const focusDirective: Directive =  {
    mounted(el){
        el.focus();
    }
};

export default focusDirective;