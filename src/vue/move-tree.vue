<template>
    <div class="stats-container">
        <div>
            <h4 :class="$style.title">{{title}}{{treeTitle}}</h4>
            <button v-if="!isRoot" @click="resetTree()">Reset</button>
            <ol>
                <li 
                    v-for="(childKey, index) in children" 
                    :key="index" 
                    :class="$style.statItem"
                    @click="childClicked(childKey)"
                >
                    <h5 :class="$style.statTitle">
                        <span>{{ childKey }} {{ ' ' }}</span> 
                        <span :class="$style.gamesCount">{{ getChild(childKey).games }} games </span> 
                        <span :class="$style.gamesCountPercentage">{{ calculatePercentage(getChild(childKey).games, totalGames) }}%</span>
                    </h5>
                    <dl :class="$style.statPercentages">
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

<style lang="scss" module>
    .title {
        font-size: 1.25rem;
    }

    .statTitle {
        font-size: 1rem;
        margin: 0 0 0.5rem;
    }

    .gamesCount, .gamesCountPercentage {
        font-weight: normal;
        margin-left: 1rem;
    }

    .statItem {
        margin: 0;
    }

    .statPercentages {
        display: flex;
        margin: 0 0 1rem;

        dd {
            margin: 0 1em 0 0.25em;
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
        isRoot(){
            return this.path.length === 0;
        },
        treeTitle(){
            if(this.isRoot){
                return '';
            }
            let ret = ' - ';
            let moveNumber = 0;
            this.path.forEach((move, i) => {
                if(i % 2 === 0){
                    moveNumber++;
                    ret += `${moveNumber}.`;
                }
                ret += `${move} `;
            });
            return ret;
        },
        totalGames(){
            return Object.keys(this.currentNode.children).reduce((total, key) => total + this.currentNode.children[key].games, 0);
        },
        children(){
            return Object.keys(this.currentNode.children).sort((key1, key2) => this.currentNode.children[key2].games - this.currentNode.children[key1].games);
        },
    },
    watch: {
        path: {
            handler(){
                this.$emit('treeUpdated', this.path);
            },
            deep: true,
        }
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
        resetTree(){
            this.path = [];
            this.currentNode = this.tree;
        },
    },
};
</script>