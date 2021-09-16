<template>
    <div :class="$style.container">
        <div>
            <h4 :class="$style.title">{{title}}{{treeTitle}}</h4>
            <button v-if="!isRoot" @click="resetTree()">Reset</button>
            <ol :class="$style.moveList">
                <li 
                    v-for="(childKey, index) in children" 
                    :key="index" 
                    :class="$style.statItem"
                >
                    <div :class="$style.clickable" @click="childClicked(childKey)">
                        <h5 :class="$style.statTitle">
                            <span>{{ childKey }} {{ ' ' }}</span> 
                            <span :class="$style.gamesCount">{{ getChild(childKey).games.length }} games </span> 
                            <span :class="$style.gamesCountPercentage">{{ calculatePercentage(getChild(childKey).games.length, totalGames) }}%</span>
                        </h5>
                        <dl :class="$style.statPercentages">
                            <dt>Wins</dt>
                            <dd>
                                {{calculatePercentage(getChild(childKey).results.wins, getChild(childKey).games.length)}}%
                            </dd>
                            <dt>Draws</dt>
                            <dd>
                                {{calculatePercentage(getChild(childKey).results.draws, getChild(childKey).games.length)}}%
                            </dd>
                            <dt>Losses</dt>
                            <dd>
                                {{calculatePercentage(getChild(childKey).results.losses, getChild(childKey).games.length)}}%
                            </dd>
                        </dl>
                    </div>
                    <ul 
                        :class="$style.gameLinksList"
                        v-if="getChild(childKey).games.length <= 4"
                    >
                        <li 
                            :class="$style.gameLinkItem"
                            v-for="gameUrl in getChild(childKey).games" 
                            :key="gameUrl"
                        >
                            <a :href="gameUrl" target="_blank" rel="noopener noreferrer">{{ gameUrl.replace(/^https?:\/\/(www.)?/, '') }}</a>
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        margin: 0 0 4rem;
    }

    button {
        cursor: pointer;
        margin: 0 0 1rem;
    }

    .clickable {
        cursor: pointer;

        &:hover {
            background-color: #d1eeff;
        }
    }
    .title {
        font-size: 1.25rem;
        margin: 0 0 0.7rem;
    }

    .moveList {
        padding-left: 1.25em;
        margin: 0;
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
        margin: 0 0 1rem;
    }

    .statPercentages {
        display: flex;
        margin: 0 0 0.25rem;

        dd {
            margin: 0 1em 0 0.25em;
        }
    }

    .gameLinksList {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    .gameLinkItem {
        margin: 0 1em 0 0;
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
            return Object.keys(this.currentNode.children).reduce((total, key) => total + this.currentNode.children[key].games.length, 0);
        },
        children(){
            return Object.keys(this.currentNode.children).sort((key1, key2) => this.currentNode.children[key2].games.length - this.currentNode.children[key1].games.length);
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