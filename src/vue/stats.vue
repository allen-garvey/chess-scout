<template>
    <div>
        <h3>{{title}}</h3>
        <div v-for="(stat, color) in stats" :key="color">
            <h4>{{color}}</h4>
            <ol>
                <li 
                    v-for="(moveArray, index) in stat" 
                    :key="index" 
                    :class="$style['stat-item']"
                >
                    <h5 :class="$style['stat-title']">{{moveArray[0]}} ({{moveArray[1].games}})</h5>
                    <dl :class="$style['stat-percentages']">
                        <dt>Wins</dt>
                        <dd>{{calculatePercentage(moveArray[1].wins, moveArray[1].games)}}%</dd>
                        <dt>Draws</dt>
                        <dd>{{calculatePercentage(moveArray[1].draws, moveArray[1].games)}}%</dd>
                        <dt>Losses</dt>
                        <dd>{{calculatePercentage(moveArray[1].losses, moveArray[1].games)}}%</dd>
                    </dl>
                </li>
            </ol>
        </div>
    </div>
</template>

<style lang="scss" module>
.stat-item{
    display: flex;
    margin-bottom: 1rem;
}
.stat-title{
    margin: 0 2rem 0 0;
    min-width: 6em;
}

.stat-percentages{
    margin: 0;
    display: flex;

    dd{
        margin: 0 2em 0 0.5em;
    }
}
</style>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        stats: {
            type: Object,
            required: true,
        },
    },
    methods: {
        calculatePercentage(part, total){
            return (part / total * 100).toFixed(2);
        },
    },
};
</script>