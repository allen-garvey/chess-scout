<template>
    <div>
        <div :class="$style.container">
            <div 
                :class="$style.wins"
                :style="{width: calculateWidth(wins)}"
            >
            </div>
            <div 
                :class="$style.draws"
                :style="{width: calculateWidth(draws)}"
            >
            </div>
            <div 
                :class="$style.losses"
                :style="{width: calculateWidth(losses)}"
            >
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        height: 10px;
        width: 300px;
        display: flex;
    }
    .wins {
        background-color: green;
    }
    .draws {
        background-color: yellow;
    }
    .losses {
        background-color: red;
    }
</style>

<script>
export default {
    props: {
        total: {
            type: Number,
            required: true,
        },
        wins: {
            type: Number,
            required: true,
        },
        draws: {
            type: Number,
            required: true,
        },
        losses: {
            type: Number,
            required: true,
        },
    },
    methods: {
        calculateWidth(num){
            return `${num / this.total * 100}%`;
        }
    }
};
</script>