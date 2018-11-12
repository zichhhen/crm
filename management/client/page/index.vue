<template>
   <h1>
    "hello world"
   </h1>
</template>
<script>
    let ajax = require('../widget/utils/ajax');
    let rightClick = require('../widget/rightClick.vue');
    module.exports = {
        components: {
            'item': require('../widget/item.vue'),
            'pageLayout': require('../widget/layout.vue'),
            'rightClick': rightClick,
            'alert': require('../widget/alert.vue'),
            'float-panel': require('../widget/floatPanel.vue'),
            'search-input': require('../widget/searchInput.vue'),
        },
        computed: {
            
        },
        watch: {
            
        },
        data: {
            
        },
        mounted() {
            
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
    @baseColor: #205081;
    @borderGrey: #b5b5b5;
    .content {
        
    }
</style>