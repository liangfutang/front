<template>
    <el-menu
        :style="{width: '230px'}"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="log-lg">DIDI陪诊</p>
        <TreeMenu :index="1" :menuData="menuData"></TreeMenu>
    </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import {useRouter} from 'vue-router'
import {reactive} from 'vue'

const router = useRouter()
const menuData = reactive(router.options.routes[0].children)

const handleOpen = () => {}
const handleClose = () => {}
</script>


<style lang="less" scope>
.aside-container {
  .log-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>