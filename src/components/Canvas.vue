<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String,
})
const div = ref(null);
onMounted(() => {
  // https://xantorohara.github.io/led-matrix-editor
  // 8*8 led 点阵
  const led0_9 = [
    ["00000000", "00111100", "01100110", "01101110", "01110110", "01100110", "01100110", "00111100"],
    ["00000000", "00011000", "00011000", "00111000", "00011000", "00011000", "00011000", "01111110"],
    ["00000000", "00111100", "01100110", "00000110", "00001100", "00110000", "01100000", "01111110"],
    ["00000000", "00111100", "01100110", "00000110", "00011100", "00000110", "01100110", "00111100"],
    ["00000000", "00001100", "00011100", "00101100", "01001100", "01111110", "00001100", "00001100"],
    ["00000000", "01111110", "01100000", "01111100", "00000110", "00000110", "01100110", "00111100"],
    ["00000000", "00111100", "01100110", "01100000", "01111100", "01100110", "01100110", "00111100"],
    ["00000000", "01111110", "01100110", "00001100", "00001100", "00011000", "00011000", "00011000"],
    ["00000000", "00111100", "01100110", "01100110", "00111100", "01100110", "01100110", "00111100"],
    ["00000000", "00111100", "01100110", "01100110", "00111110", "00000110", "01100110", "00111100"]
  ];
  const size = 15;
  const width = 16*size, height = 8*size+size;
  const canvas = document.createElement('canvas');
  canvas.style.backgroundColor = '#000';
  canvas.width = width;
  canvas.height = height;
  div.value.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#00bcd4';
      ctx.shadowColor = '#00bcd4';
      ctx.shadowBlur = size/2;

  function drawNum(dx, num) {
    const pos0 = getPos(dx, 0, led0_9[num]);
    pos0.forEach(arr => {
      ctx.beginPath();
      ctx.arc(arr[0] * size + size/2, arr[1] * size + size/2, size*0.4, 0, 2 * Math.PI);
      ctx.fill();
    })
  }

  function getPos(x, y, strs) {
    let pos = [];
    strs.forEach((str, i) => {
      const arr = str.split("");
      arr.forEach((e, j) => {
        if (e == 1) {
          pos.push([x + j, y + i])
        }
      });
    });
    return pos;
  }

  let _t0 = 0;
  let _t1 = 0;
  drawNum(0, 0);
  drawNum(8, 0);
  setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    drawNum(0, _t1);
    drawNum(8, _t0);
    _t0++;
    if (_t0 > 9) {
      _t0 = 0;
      _t1++;
      if (_t1 > 5) {
        _t1 = 0;
      }
    }
  }, 1000);
})
</script>

<template>
  <div ref="div"></div>
</template>

<style scoped></style>