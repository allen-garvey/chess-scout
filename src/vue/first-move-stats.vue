<template>
    <div class="first-move-stats-container">
        <h3>First Move Stats</h3>
        <div v-for="(stat, color) in stats" :key="color">
            <h4>{{color}}</h4>
            <ol>
                <li v-for="(moveArray, index) in stat" :key="index">
                    <h5>{{moveArray[0]}} ({{moveArray[1].games}})</h5>
                    <dl>
                        <dt>Wins</dt>
                        <dd>{{calculatePercentage(moveArray[1].wins, moveArray[1].games)}}%</dd>
                    </dl>
                    <dl>
                        <dt>Draws</dt>
                        <dd>{{calculatePercentage(moveArray[1].draws, moveArray[1].games)}}%</dd>
                    </dl>
                    <dl>
                        <dt>Losses</dt>
                        <dd>{{calculatePercentage(moveArray[1].losses, moveArray[1].games)}}%</dd>
                    </dl>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    props: {
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