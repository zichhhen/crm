<template>
    <float-panel :is-show=isShow @close="close">
        <div>
            <div class="prompt" v-if="type=='confirm'">
                <p>{{text}}</p>
                <p style="color: #c10000;font-size: 14px;height: 19px;">{{errText}}</p>
                <div class="button-list">
                    <button class="ok" @click="confirmOK">确定</button>
                    <button @click="confirmFall" style="background-color: grey;color: white;">取消</button>
                </div>
            </div>
            <div class="prompt" v-if="type=='prompt'">
                <p>{{text}}</p>
                <input type="text" v-model="inputValue" label="" value=""/>
                <p style="color: #c10000;font-size: 14px;height: 19px;">{{errText}}</p>
                <div class="button-list">
                    <button class="ok" @click="promptOk">确定</button>
                    <button @click="close" style="background-color: grey;color: white;">取消</button>
                </div>
            </div>
        </div>
    </float-panel>
</template>
<script>
    var floatPanel = require('./floatPanel.vue');
    module.exports = {
        props: [],
        data() {
            return {
                isShow: false,
                type: 'alert',
                text: '',
                inputValue: '',
                errText: ' ',
                callback: function (value) {
                },
                option: {}
            };
        },
        components: {
            'float-panel': floatPanel
        },
        methods: {
            close() {
                this.isShow = false;
                this.$emit('close');
            },
            alert() {
                this.type = 'alert';
                this.isShow = true;
                this.text = text;
                this.inputValue = '';
            },
            confirm(option, callback) {
                this.type = 'confirm';
                this.option = option;
                this.isShow = true;
                this.text = option.title;
                this.inputValue = '';
                this.errText = ' ';
                this.callback = callback;
            },
            confirmOK() {
                this.callback(true);
                if (this.option.autoClose !== false) {
                    this.isShow = false;
                }
            },
            confirmFall() {
                this.callback(false);
                if (this.option.autoClose !== false) {
                    this.isShow = false;
                }
            },
            promptOk() {
                if (this.option.match) {
                    if (this.inputValue.match(this.option.match) === null) {
                        this.errText = '格式有误';
                        return;
                    }
                }
                if (this.inputValue !== '') {
                    this.callback(this.inputValue);
                    if (this.option.autoClose !== false) {
                        this.isShow = false;
                    }
                }
            },
            prompt(option, callback) {
                this.type = 'prompt';
                this.option = option;
                this.isShow = true;
                this.text = option.title;
                this.inputValue = '';
                this.errText = ' ';
                this.callback = callback;
            }
        },
    };
</script>
<style lang="less" scoped>
    @baseColor: #205081;
    @borderGrey: #b5b5b5;
    @baseShadow: -2px 3px 30px 0 rgba(123, 123, 123, 0.3);
    .nav {
        width: 100%;
        height: 30px;
        border-radius: 2px 2px 0 0;
        background-color: fadeout(@baseColor, 15%);
        .close {
            width: 50px;
            background: linear-gradient(0deg, #c19090, 10%, #984f4f, 46%, #ab6565, 60%, #ead5d5);
            height: 24px;
            position: absolute;
            right: 6px;
            border-radius: 0px 0px 6px 6px;
            border: solid 1px #676767;
            border-top: 0;
            box-shadow: 0 0 1px 0 #ffffff21;
            text-align: center;
            color: #fff9f9;
            cursor: pointer;
        }
        .close:hover {
            box-shadow: 0 0 11px 1px #ab7f65;
            background: linear-gradient(0deg, #c19090, 10%, #b5613d, 46%, #ca7652, 60%, #ead5d5);
        }
    }

    .button-list {
        margin-top: 20px;
        text-align: center;
        > *:not(:first-child) {
            margin-left: 10px;
        }
    }

    .prompt {
        width: 300px;
        p {
            margin: 0 0 10px 0;
        }
        input {
            border: solid 1px #b5b5b5;
            border-radius: 2px;
            padding: 5px 10px;
            box-sizing: border-box;
            width: 100%;
            font-size: 16px;
            box-shadow: @baseShadow;
        }
        button {
            background-color: @baseColor;
            border: solid 1px @borderGrey;
            border-radius: 3px;
            font-size: 14px;
            padding: 4px 14px;
            color: #ebf1f7;
            box-shadow: @baseShadow;
        }
        .ok:hover {
            box-shadow: 0 0 20px 0 #5f97d0ab;
        }
    }
</style>