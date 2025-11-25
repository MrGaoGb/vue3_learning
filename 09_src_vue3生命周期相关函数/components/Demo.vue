<template>
  <h3>当前累计的值：{{ sum }}</h3>
  <button @click="sum++">sum加1</button>
</template>

<script>

// 引入ref函数
import {onBeforeUnmount,onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from 'vue'

export default {
  name: 'Demo',
  setup(props,context) {
    // console.log('----setup----');
    
    let sum = ref(0)

    // 通过组合API的形式配置生命周期函数

    onBeforeMount(() => {
      console.log('----onBeforeMount-----');
    })

    onMounted(() => {
      console.log('----onMounted----');
    })

    onBeforeUpdate(() => {
      console.log('----onBeforeUpdate----');
    })

    onUpdated(() => {
      console.log('----onUpdated----');
    })

    onBeforeUnmount(() => {
      console.log('----onBeforeUnmount----');
    })
    
    onUnmounted(() => {
      console.log('----onUnmounted----');
    })

    return {
      sum
    }
  },

  // 通过配置项配置生命周期函数
  // beforeCreate(){
  //   console.log('----beforeCreate----');
  // },
  // created(){
  //   console.log('----created----');
  // },
  // beforeMount(){
  //   console.log('----beforeMount----');
  // },
  // mounted(){
  //   console.log('----mounted----');
  // },
  // beforeUpdate(){
  //   console.log('----beforeUpdate----');
  // },
  // updated(){
  //   console.log('----updated----');
  // },
  // beforeUnmount() {
  //   console.log('----beforeUnmount----');
  // },
  // unmounted() {
  //   console.log('----unmounted----');
  // },
}
</script>
