<script setup>
import { ref , onMounted} from 'vue'

defineProps({
  msg: String,
})
const div = ref(null);
onMounted(() => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 100;
  div.value.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);
})
</script>

<template>
  <div ref="div"></div>
</template>

<style scoped>
</style>
