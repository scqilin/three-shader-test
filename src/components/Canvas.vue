<script setup>
import { ref, onMounted } from 'vue'
import { LedLight } from './class/LedLight'
defineProps({
  msg: String,
})
const div = ref(null);
onMounted(() => {
  div.value.style.backgroundColor = 'black';
  const led = new LedLight(div,{
    color: 'yellow',
    bitWidth: 26,
    size: 7,
    shadowBlur: 0.2,
    //自定义字符集
    charset: {
      "-": "0000003c00000000",
      ":" : "0018180018180000",
      "+" : "0010107c10100000",
    }
  });
  
  let _t = 0;
  led.run('Fix Bug Number 0');
  led.scroll(1000/90);
  setInterval(() => {
    _t++;
    led.run(`Fix Bug Number +${_t}`);
  }, 1000);
})
</script>

<template>
  <div ref="div"></div>
</template>

<style scoped></style>