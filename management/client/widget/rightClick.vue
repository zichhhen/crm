<template>
    <div class="rightClick" @contextmenu="youjian">
        <slot></slot>
    </div>
</template>
<script>
    module.exports = {
        props: [],
        data() {
            return {};
        },
        methods: {
            youjian(e) {
                e.preventDefault();
                return false;
            }
        },
    };
</script>
<style lang="less" scoped>
    @baseShadow: -2px 3px 30px 0 rgba(123, 123, 123, 0.65);
    @select: #4173a7;
    .rightClick {
        position: absolute;
        box-shadow: -2px 3px 10px 0px rgba(123, 123, 123, 0.65);
        width: 150px;
        cursor: default;
        background-color: #f9f9f9;
        border: solid 1px #384858;
        border-radius: 2px;
        border-right: solid 1px #597086;
        border-top: solid 1px #597086;
        > * {
            box-sizing: border-box;
            display: block;
            padding: 5px;
            color: #010b15;
            width: 100%;
        }
        > *:hover {
            box-shadow: inset 0 0 20px 0px rgba(255, 255, 255, 0.33);
            background-color: @select;
            color: #e8f4ff;
        }
    }
</style>