<template>
  <el-row class="main">
    <el-col :span="4">
      <el-menu
        text-color="#000000"
        active-text-color="#409EFF"
        router
        default-active="1"
      >
        <el-menu-item index="1" :route="isInRoom">
          <span class="menu">五子棋</span>
        </el-menu-item>
        <el-menu-item index="2" route="/wuziqi">
          <span class="menu">棋盘</span>
        </el-menu-item>
        <el-menu-item index="3" route="/add">
          <span class="menu">新建</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <router-view />
    </el-col>
  </el-row>
</template>
<script>
export default {
  computed: {
    isInRoom() {
      return this.$store.state.isInRoom ? '/wuziqi' : '/room'
    },
  },
  mounted() {},
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  display: flex;
}
.main {
  width: 100%;
}
.menu {
  font-size: 1.2rem;
}
</style>
