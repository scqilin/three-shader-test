<script setup>
import HelloWorld from './components/HelloWorld.vue'
import LedCard from './components/LedCard.vue'
import THREEBox from './components/THREEBox.vue'
</script>

<template>
  <LedCard msg="NUMBER OF BUGS" />
  <LedCard msg="BEI JING 37" roll = "0" bitNum = "11" />
  <LedCard msg="我们每天度过的称之为日常的生活" roll = "0" bitNum = "15" />
  <LedCard msg="其实是一个个奇迹的连续也说不定" roll = "0" bitNum = "15" />
  <HelloWorld msg="HelloWorld" />
  <THREEBox />
</template>

<style scoped>

</style>
