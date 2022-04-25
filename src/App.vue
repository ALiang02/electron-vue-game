<template>
  <div class="main">
    <router-view />
  </div>
</template>
<script setup>
import { socketInit } from '@/utils/ws'
socketInit()
</script>
<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: antiquewhite;
}

#app {
  height: 100%;
  width: 100%;
  background-color: antiquewhite;
}
.main {
  height: 45rem;
  width: 80rem;
  margin: 0 auto;
}
</style>
