<template>
  <div class="header-container">
    <div class="header-left flex-box">
      <el-icon v-if="!isCollapse" class="icon" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
      <el-icon v-else class="icon" size="20" @click="store.commit('collapseMenu')"><Expand /></el-icon>
    </div>
    <div class="header-right">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p class="user-name">admin</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()
const isCollapse = computed(() =>  store.state.menu.isCollapse)

</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;
  .header-left {
    height: 100%;
    .icon {
      width: 45px;
      height: 100%;
    }
    .icon:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
  }
  .header-right {
    .user-name {
      margin-left: 10px;
    }
  }
}
</style>