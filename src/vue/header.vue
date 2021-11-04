<template>
    <div :class="$style.container">
        <h1 :class="$style.title">
            <router-link :to="{ name: 'home' }">Chess Scout</router-link>
        </h1>
    </div>
</template>

<style lang="scss" module>
    .container {
        margin-bottom: 0.7rem;
    }
    .title {
        margin: 0;
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>