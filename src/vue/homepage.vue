<template>
    <div :class="$style.container">
        <Header />
        <Search />
        <Top-Players />
    </div>
</template>

<style lang="scss" module>
    .container {

    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './header.vue';
import Search from './search.vue';
import TopPlayers from './top-players.vue';

export default defineComponent({
    components: {
        Header,
        Search,
        TopPlayers,
    },
});
</script>