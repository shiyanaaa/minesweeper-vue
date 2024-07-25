<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="main">
    <RouterView />
  </div>

</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>
