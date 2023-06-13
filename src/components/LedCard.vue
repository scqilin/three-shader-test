<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { LedLight } from './class/LedLight'
import { Pixel8 } from './class/core/pixel8';

const props = defineProps({
  msg: {
    type: String,
    default: 'Hello World'
  },
  roll: {
    type: Number,
    default: 1
  },
  bitNum: {
    type: Number,
    default: 26
  },
})

const div = ref(null);
onMounted(() => {
  div.value.style.backgroundColor = 'black';
  const led = new LedLight(div, {
    color: 'yellow',
    bitNum: + props.bitNum,
    size: 2.5,
    shadowBlur: 0.5,
    //自定义字符集 https://xantorohara.github.io/led-matrix-editor
    charset: {
      "-": "0000003c00000000",
      ":": "0018180018180000",
      "+": "0010107c10100000",
    }
  });

  led.run(props.msg);
  // led.run(props.msg);
  // led.run(props.msg);
  // led.run(props.msg);
  // led.run(props.msg);
 
  if (props.roll != 0) {
    led.scroll(1000 / 90);
  }
  // 如果msg 包含 BUGS 则每秒加1
  if (props.msg.includes('BUGS')) {
      let _t = 0;
      setInterval(() => {
        _t++;
        led.run(`${props.msg} ${_t}`);
      }, 1000);
  } else {
    setInterval(() => {
        led.run(`${props.msg}`);
    }, 1000);
  }
  

})

</script>

<template>
  <div ref="div"></div>
</template>

<style scoped></style>