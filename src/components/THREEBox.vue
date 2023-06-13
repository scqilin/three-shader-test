<script setup>
import { ref, onMounted } from 'vue'
import { Box } from './class/Box'

const div = ref(null);
onMounted(() => {
  div.value.style.width = '80px';
  div.value.style.height = '80px';
  const box = new Box(div.value)
})
</script>

<template>
  <div ref="div"></div>
</template>

<style scoped></style>