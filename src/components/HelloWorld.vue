<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String,
})
const div = ref(null);
onMounted(() => {
  const canvas = document.createElement('canvas');
  canvas.width = 280;
  canvas.height = 80;
  div.value.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.font = 'bold 64px Arial';
  ctx.fillText('🀀🀁🀂🀃🀄︎', canvas.width / 2, canvas.height / 2 - 5);
  // setTimeout(() => {
  //   // 把图片分成 8 * 8 的小格子 判断格子中黑色数量比白色多 值为1 否则值为0  生成一个 8 * 8 的颜色值数组
  // const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // const data = imgData.data;
  // console.log('data :>> ', data);
  // const colorArr = [];
  // for (let y = 0; y < 8; y++) {
  //   for (let x = 0; x < 8; x++) {
  //     let blackPixels = 0;
  //     let whitePixels = 0;
  //     for (let i = 0; i < 10; i++) {
  //       for (let j = 0; j < 10; j++) {
  //         const pixelIndex = (y * 10 + i) * 320 + x * 10 + j;
  //         const r = data[pixelIndex * 4];
  //         const g = data[pixelIndex * 4 + 1];
  //         const b = data[pixelIndex * 4 + 2];
  //         if (r < 100 && g < 100 && b < 100) {
  //           blackPixels++;
  //         } else {
  //           whitePixels++;
  //         }
  //       }
  //     }
  //     console.log('object :>> ', blackPixels, whitePixels);
  //     colorArr.push(blackPixels > whitePixels ? 1 : 0);
  //   }
  // }
  // console.log(colorArr);
  // }, 1000);
  

})
</script>

<template>
  <div ref="div"></div>
</template>

<style scoped></style>
