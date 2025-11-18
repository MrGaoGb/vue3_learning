<template>
  <h2>人员信息</h2>
  <h3>姓名:{{ name }}</h3>
  <h3>年龄:{{ age }}</h3>
  <h3>工作种类:{{ job.type }}</h3>
  <h3>工作薪水:{{ job.salary }}</h3>
  <button @click="updateInfo">点击修改信息</button>
</template>

<script>

// 引入ref函数
import {ref} from 'vue'

export default {
  name: 'App',
  setup(props) {

    // 定义属性:  用ref进行修饰 基本数据类型
    let name = ref("Tom") 
    let age = ref(19) 

    // 处理对象类型
    let job = ref({
      type:'前端',
      salary:'30w'
    })

    // 定义方法
    function updateInfo(){
      // 基本数据类型修改
      name.value = 'Jerry'
      age.value = 28
      // console.log('updateInfo',name,age)

      // 对象类型修改
      job.value.type = 'UI'
      job.value.salary = '60w'
      console.log('updateInfo',job.value);

    }

    // 返回一个对象(常用)
    return {
      name,
      age,
      updateInfo,
      job
    }
  }
}
</script>
