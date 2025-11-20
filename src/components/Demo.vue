<template>
  <h2>人员信息</h2>
  <h3>姓名:{{ person.name }}</h3>
  <h3>年龄:{{ person.age }}</h3>
</template>

<script>

// 引入ref函数
import {reactive} from 'vue'

export default {
  name: 'Demo',
  setup(props) {

    // reactive函数只能处理对象类型的数据 不能处理基本类型数据
    let person = reactive({
      name:'Tom',
      age:18
    })

    // 返回一个对象(常用)
    return {
      person
    }
    
  }
}
</script>
