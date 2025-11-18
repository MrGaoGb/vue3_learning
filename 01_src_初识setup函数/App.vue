<template>
  <h2>人员信息</h2>
  <h3>姓名:{{ name }}</h3>
  <h3>年龄:{{ age }}</h3>
  <button @click="sayHello">点击</button>
</template>

<script>

import {h} from 'vue'

export default {
  name: 'App',
  setup(props) {
    //数据
    let name = "Tom"
    let age = 19 

    // 方法
    function sayHello(){
      alert(`我叫:${name},今年:${age}岁了，你好呢`)
    }

    返回一个对象(常用)
    return {
      name,
      age,
      sayHello
    }

    // 返回一个函数(渲染函数)
    // return () => {
    //   return h('h2','尚硅谷')
    // }

  }
}
</script>
