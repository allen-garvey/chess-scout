<template>
    <div class="stats-container">
        <div>
            <h4>{{title}}{{treeTitle}}</h4>
            <ol>
                <li 
                    v-for="(childKey, index) in children" 
                    :key="index" 
                    class="stat-item"
                    @click="childClicked(childKey)"
                >
                    <h5 class="stat-title">{{childKey}} ({{getChild(childKey).games}})</h5>
                    <dl class="stat-percentages">
                        <dt>Wins</dt>
                        <dd>
                            {{calculatePercentage(getChild(childKey).results.wins, getChild(childKey).games)}}%
                        </dd>
                        <dt>Draws</dt>
                        <dd>
                            {{calculatePercentage(getChild(childKey).results.draws, getChild(childKey).games)}}%
                        </dd>
                        <dt>Losses</dt>
                        <dd>
                            {{calculatePercentage(getChild(childKey).results.losses, getChild(childKey).games)}}%
                        </dd>
                    </dl>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        tree: {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            currentNode: this.tree,
            path: [],
        };
    },
    computed: {
        treeTitle(){
            return `- ${this.path.join(' ')}`;
        },
        children(){
            return Object.keys(this.currentNode.children).sort((key1, key2) => this.currentNode.children[key2].games - this.currentNode.children[key1].games);
        },
    },
    methods: {
        calculatePercentage(part, total){
            return (part / total * 100).toFixed(2);
        },
        getChild(key){
            return this.currentNode.children[key];
        },
        childClicked(key){
            this.path.push(key);
            this.currentNode = this.currentNode.children[key];
        },
    },
};
</script>