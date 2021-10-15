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
        const canvas: HTMLCanvasElement = this.$refs.canvas as HTMLCanvasElement;
        this.context = canvas.getContext('2d');
        drawBoard(this.context, this.moves);
    },
    data(){
        return {
            context: null as CanvasRenderingContext2D|null,
        };
    },
    watch: {
        moves: {
            handler(){
                drawBoard(this.context, this.moves);
            },
            deep: true,
        },
    },
});
</script>