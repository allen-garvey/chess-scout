<template>
    <div :class="$style.container">
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
import Search from './search.vue';
import TopPlayers from './top-players.vue';

export default defineComponent({
    components: {
        Search,
        TopPlayers,
    },
});
</script>