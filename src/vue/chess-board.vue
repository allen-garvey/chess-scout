<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import { drawBoard } from '../chess-board';

export default {
    props: {
        
    },
    mounted(){
        this.context = this.$refs.canvas.getContext('2d');
        drawBoard(this.context);
    },
    data(){
        return {
            context: null,
        };
    },
    computed: {
    },
    methods: {
    }
};
</script>