<template>
    <div class="search-input">
        <input ref="input" v-model="selfValue" @keyup.enter="keyupEnter($event)" @keyup.40="down" @keyup.38="up"
               @keyup="input"/>
        <div v-if="isShow&&searchValue!==''">
            <div v-for="item,key in allword" v-if="item.includes(searchValue)" :class="{on:downListSelect===key}"
                 @click="selectItem(item)">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['value', 'allword'],
        data: function () {
            return {
                selfValue: this.value,
                searchValue: '',
                downListSelect: -1,
                isShow: false,
            }
        },
        watch: {
            value(val) {
                this.isShow = true;
                this.selfValue = val;
            },
            selfValue(val) {
                this.$emit('input', val);
            },
        },
        methods: {
            input(val) {
                if (![13, 38, 40].includes(val.keyCode)) {
                    this.isShow = true;
                    this.downListSelect = -1;
                    this.searchValue = this.selfValue;
                }
            },
            down() {
                for (let i = 0; i < this.allword.length; i++) {
                    this.downListSelect++;
                    if (this.downListSelect >= this.allword.length) {
                        this.downListSelect = 0;
                    }
                    if (this.allword[this.downListSelect].includes(this.searchValue)) {
                        break;
                    }
                }
                this.selfValue = this.allword[this.downListSelect];
            },
            up() {
                for (let i = 0; i < this.allword.length; i++) {
                    this.downListSelect--;
                    if (this.downListSelect < 0) {
                        this.downListSelect = this.allword.length - 1;
                    }
                    if (this.allword[this.downListSelect].includes(this.searchValue)) {
                        break;
                    }
                }
                this.selfValue = this.allword[this.downListSelect];
            },
            keyupEnter($event) {
                if (this.downListSelect === -1) {
                    this.$emit('keyup-enter', $event);
                }
                this.downListSelect = -1;
                this.isShow = false;
                this.searchValue = '';
            },
            selectItem(val) {
                this.selfValue = val;
                window.setTimeout(() => {
                    this.isShow = false;
                    this.downListSelect = -1;
                    this.isShow = false;
                    this.searchValue = '';
                }, 100);
            }
        },
        name: "search-input"
    }
</script>

<style lang="less" scoped>
    @baseColor: #205081;
    @borderGrey: #b5b5b5;
    @baseShadow: -2px 3px 30px 0 rgba(123, 123, 123, 0.3);
    .search-input {
        position: relative;
    }

    .search-input > input {
        border: solid 1px #b5b5b5;
        border-radius: 2px;
        padding: 5px 10px;
        box-sizing: border-box;
        width: 100%;
        font-size: 16px;
        box-shadow: @baseShadow;
    }

    .search-input > div {
        position: absolute;
        z-index: 999;
        background-color: white;
        border: solid 1px @borderGrey;
        width: 100%;
        max-height: 300px;
        overflow: auto;
        box-shadow: @baseShadow;
    }

    .search-input > div > div {
        padding: 5px;
        cursor: default;
        &.on {
            background-color: fadeout(@baseColor, 50%);
        }
    }

    .search-input > div > div:hover {
        color: #ddedf7;
        background-color: @baseColor;
    }
</style>