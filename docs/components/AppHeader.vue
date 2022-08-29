
<script setup>
import { ref } from "vue";
const num = ref(0);
const setNum = ()=>{
  num.value = 10000;
}
</script>
<template>
  <div>sdfasfsdf{{ num }}</div>
  <button @click="setNum" >点击我看看</button>
</template>



