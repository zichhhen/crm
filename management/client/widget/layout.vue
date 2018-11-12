<template>
    <div class="main-content">
        <div class="header">
            <div class="icon">management</div>
        </div>
        <div class="layout-content">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .main-content {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .header {
            background-color: #205081;
            box-sizing: border-box;
            padding: 10px 20px;
            height: 60px;
            .icon {
                color: #83a9c5;
                font-size: 25px;
            }
        }

        .layout-content {
            position: fixed;
            width: 100%;
            top: 60px;
            bottom: 0;
        }
    }
</style>