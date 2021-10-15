<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { drawBoard } from '../chess-board';

export default defineComponent({
    props: {
        moves: {
            type: Array,
            required: true,
        },
    },
    mounted(){
        this.context = this.$refs.canvas.getContext('2d');
        drawBoard(this.context, this.moves);
    },
    data(){
        return {
            context: null,
        };
    },
    computed: {
    },
    watch: {
        moves: {
            handler(){
                drawBoard(this.context, this.moves);
            },
            deep: true,
        },
    },
    methods: {
    }
});
</script>