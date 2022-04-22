<template>
  <a-row
    class="room-list-view"
    justify="center"
    style="height: 100%; align-items: center"
  >
    <a-col :span="6" style="height: 6rem">
      <a-card class="room-list" hoverable>
        <div
          style="text-align: center; font-size: 48px"
          @click="
            () => {
              this.$router.push('/roomlistview')
            }
          "
        >
          五子棋
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup></script>
