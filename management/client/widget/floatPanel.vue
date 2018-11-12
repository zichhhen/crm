<template>
    <div class="float-content" v-show="selfIsShow">
        <div class="panel">
            <div class="nav">
                <div class="close" @click="closePanel">X</div>
            </div>
            <div style="padding: 15px;">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['is-show'],
        data() {
            return {
                selfIsShow: this.isShow,
            };
        },
        watch: {
            isShow(value) {
                this.selfIsShow = value;
            },
        },
        methods: {
            closePanel() {
                this.selfIsShow = false;
                this.$emit('close');
            },
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #205081;
    @borderGrey: #b5b5b5;
    @baseShadow: -2px 3px 30px 0 rgba(123, 123, 123, 0.3);
    .float-content {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        width: 100%;
        left: 0;
        height: 100%;
        background-color: rgba(1, 1, 1, 0.32);
        .panel {
            position: relative;
            box-sizing: border-box;
            background-color: white;
            border: solid 1px @borderGrey;
            box-shadow: 0 30px 250px 0 #e8e8e8;
            border-radius: 2px;
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
            p {
                margin: 5px 0 5px 0;
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
        }
    }
</style>