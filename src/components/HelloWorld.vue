<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String,
})
const div = ref(null);
onMounted(() => {
  div.value.style.fontFamily = 'fusion-pixel-8px-proportional, sans-serif';
  const canvas = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 40;
  div.value.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.font = 'bold 46px fusion-pixel-8px-proportional, sans-serif';
  // 检查字体是否加载完成
  document.fonts.ready.then(() => {
    // // // 背景矩形
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // // // 文字
    // ctx.fillStyle = 'black';
    ctx.fillText('好', canvas.width / 2+3 , canvas.height / 2 +3);
    // 取64个像素点a值 
    // 行 [2 7 12 17 22 27 32 37]
    // 列 [2 7 12 17 22 27 32 37]
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const colorArr = [];
    let row = [2, 7, 12, 17, 22, 27, 32, 37];
    let col = [2, 7, 12, 17, 22, 27, 32, 37];
    row.map((item,i)=>{
      if(!colorArr[i]){
          colorArr[i] = [];
      }
      col.map((item2,j)=>{
        const k = item * 4 * 40 + item2*4;
        const a = data[k + 3];
        if (a === 255) {
          colorArr[i][j] = 1;
        } else {
          colorArr[i][j] = 0;
        }
      })
    })
    
    const hexArr = [];
    for (let y = 0; y < 8; y++) {
      let hex = '';
      for (let x = 0; x < 8; x++) {
        hex += colorArr[y][x];
      }
      hex = hex.split('').reverse().join('');
      hexArr.push(parseInt(hex, 2).toString(16).padStart(2, '0'));
    }
    const hexStr = hexArr.reverse().join('');
  });



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
  <div ref="div">缝合像素字体 / Fusion Pixel Font</div>
</template>

<style scoped>
/* 添加字体 */
@font-face {
  font-family: 'fusion-pixel-8px-proportional';
  src: url('./font/fusion-pixel-8px-proportional.ttf') format('truetype');
}
</style>
