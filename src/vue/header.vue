<template>
    <div :class="$style.container">
        <h1 :class="$style.title">
            <router-link :to="{ name: 'home' }" :class="$style.link">Chess Scout</router-link>
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
    .link {
        text-decoration: none;
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>