<template>
    <div class="item">
        <div class="title" :class="{on:id===selectId||id===selfValue}" @contextmenu="youjian(id)">
            <div class="serviceUnit" v-if="type=='serviceUnit'" @click="leftClick(id)">&#xe661;</div>
            <div class="add" @click="more" v-if="!isOpen&&type=='service'">+</div>
            <div class="add" @click="less" v-if="isOpen&&type=='service'">-</div>
            <div class="name" :class="{hand:type=='serviceUnit'}" @click="leftClick(id,'')">{{name}}</div>
        </div>
        <div class="loading" v-if="this.isLoading && loadingTime>=3">加载中{{(loadingTime / 10).toFixed(1)}}</div>
        <div class="lond-wrong" v-if="this.isWrong">错误，重试</div>
        <div class="child" v-show="isOpen">
            <div class="empty" v-if="this.child.length===0">空</div>
            <item v-for="item in this.child"
                  :select-id="selectId"
                  :key="item.id"
                  :id="item.id"
                  :name="item.name"
                  :type="item.type"
                  v-model="selfValue"
                  @rightSelect="childRight"
                  @leftselect="leftClick"
            ></item>
        </div>
    </div>
</template>
<script>
    var ajax = require('./utils/ajax');
    module.exports = {
        name: 'item',
        props: ['id', 'name', 'type', 'select-id', 'value'],
        data() {
            return {
                isOpen: false,
                selfValue: this.value,
                child: [],
                isLoading: false,
                loadingTime: 0,
                isWrong: false,
                currentName:''
            };
        },
        watch: {
            value: function (val) {
                this.selfValue = val;
            }
        },
        methods: {
            getSelect() {
                if (this.selectId === this.id) {
                    return this;
                } else {
                    if (this.$children.length > 0) {
                        for (let i = 0; i < this.$children.length; i++) {
                            var item = this.$children[i].getSelect();
                            if (item !== null) {
                                return item;
                            }
                        }
                    }
                    return null;
                }
            },
            updateSelectId() {
                if (this.selectId === this.id) {
                    this.less();
                    this.more();
                } else {
                    this.$children.forEach(item => {
                        item.updateSelectId();
                    });
                }
            },
            childRight(id) {
                this.$emit('rightSelect', id);
            },
            youjian(id) {
                this.$emit('rightSelect', id);
            },
            leftClick(id,leftStr) {
                var leftStr=leftStr+ ',' + this.name;
                this.$emit('input', id);
                this.$emit('leftselect', id,leftStr);
                this.currentName = leftStr;
                return leftStr;
            },
            more() {
                let self = this;
                this.isLoading = true;
                this.isWrong = false;
                this.loadingTime = 0;
                let time = window.setInterval(() => {
                    this.loadingTime++;
                }, 100);
                let promiseApi = ajax({
                    data: {
                        pid: this.id,
                    },
                    type: 'GET'
                });
                promiseApi.then(res => {
                    this.isLoading = false;
                    this.isWrong = false;
                    clearInterval(time);
                    if (res instanceof Array) {
                        self.child = res;
                        self.isOpen = true;
                    }
                });
                promiseApi.catch(e => {
                    this.isLoading = false;
                    this.isWrong = true;
                    clearInterval(time);
                });
                this.$emit('rightSelect', -1);
            },
            less() {
                this.isOpen = false;
            }
        },
    };
</script>
<style lang="less" scoped>
    @baseShadow: -2px 3px 7px 0 rgba(123, 123, 123, 0.65);
    @select: #4173a7;
    .item {
        position: relative;
        .add {
            float: left;
            border: solid 1px #2f2f2f;
            background-color: white;
            font-weight: bold;
            box-shadow: @baseShadow;
            text-align: center;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 3px;
            cursor: pointer;
        }
        .add:hover {
            box-shadow: -2px 1px 10px 0 rgb(123, 123, 123);
            background: linear-gradient(30deg, #cccccc, 10%, #efefef, 90%, #ffffff);
            transition: box-shadow, background 3s, 0.2s;
            border-right: solid 1px #696969;
            -moz-transition: box-shadow, background 3s, 0.2s; /* Firefox 4 */
            -webkit-transition: box-shadow, background 3s, 0.2s; /* Safari 和 Chrome */
            -o-transition: box-shadow, background 3s, 0.2s; /* Opera */
        }
        @font-face {
            font-family: 'iconfont';  /* project id 502298 */
            src: url('//at.alicdn.com/t/font_502298_qkdv7ldnwn17zaor.eot');
            src: url('//at.alicdn.com/t/font_502298_qkdv7ldnwn17zaor.eot?#iefix') format('embedded-opentype'),
            url('//at.alicdn.com/t/font_502298_qkdv7ldnwn17zaor.woff') format('woff'),
            url('//at.alicdn.com/t/font_502298_qkdv7ldnwn17zaor.ttf') format('truetype'),
            url('//at.alicdn.com/t/font_502298_qkdv7ldnwn17zaor.svg#iconfont') format('svg');
        }
        .serviceUnit {
            font-family: 'iconfont';
            float: left;
            border: solid 1px #4e4e4e;
            background-color: white;
            font-weight: bold;
            box-shadow: @baseShadow;
            text-align: center;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 3px;
            cursor: pointer;
        }
        .title {
            .hand {
                cursor: pointer;
            }
        }
        .title {
            width: 170px;
            padding: 2px;
        }
        .title:first-child:hover {
            background-color: rgba(238, 241, 255, 0.55);
        }
        .name {
            float: left;
            cursor: default;
            padding-left: 5px;
            width: 140px;
        }
        .on {
            background-color: @select;
            .name {
                color: #eff7ff;
            }
        }
        .on:hover {
            background-color: @select !important;
        }
        .child {
            clear: both;
            margin-left: 23px;
            .empty {
                color: #bbbbbb;
            }
        }
        .loading {
            margin-left: 23px;
            color: #4da75a;
        }
        .lond-wrong {
            margin-left: 23px;
            color: #c74e30;
        }
    }

    .item .item:before {
        content: '';
        display: block;
        position: absolute;
        width: 23px;
        z-index: -1;
        height: 2px;
        top: 10px;
        left: -11px;
        background-color: #757575ba;
    }

    .item:after {
        content: '';
        display: block;
        position: absolute;
        width: 2px;
        z-index: -1;
        left: 10px;
        top: 10px;
        bottom: 10px;
        background-color: #757575ba;
    }

    .item > div:after {
        content: '';
        display: block;
        clear: both;
    }

    .item.on {
        height: 100px;
    }

</style>