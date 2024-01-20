<script setup lang="ts">
import TheClassroom from './components/TheClassroom.vue'
import TheList from './components/TheList.vue'
import TheResult from './components/TheResult.vue';
</script>

<template>
  <main>
    <TheList />
    <TheClassroom />
    <TheResult class="fullpage"/>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.fullpage {
  grid-column: 1 / -1;
}
</style>
