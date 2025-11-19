<template>
  <h2>人员信息</h2>
  <h3>姓名:{{ person.name }}</h3>
  <h3>年龄:{{ person.age }}</h3>
  <h3>工作种类:{{ person.job.type }}</h3>
  <h3>工作薪水:{{ person.job.salary }}</h3>
  <hr/>
  <!-- 测试数据 -->
  <h3>测试数据</h3>
  <h4>c的值{{ person.a.b.c }}:</h4>
  <h4>数组: {{ person.course }}</h4>
  <h4></h4>
  <button @click="updateInfo">点击修改信息</button>
</template>

<script>

// 引入ref函数
import {reactive} from 'vue'

export default {
  name: 'App',
  setup(props) {

    // reactive函数只能处理对象类型的数据 不能处理基本类型数据
    let person = reactive({
      name:'Tom',
      age:18,
      job: {
        type:'Java后端',
        salary:'25K'
      },
      a:{
        b:{
          c: 666
        }
      },
      course:['Spring','SpringBoot','SpringCloud']// 课程
    })

    // 定义方法
    function updateInfo(){

      // console.log('@@@',person);
      

      person.name = 'Jerry'
      person.age = 28

      // 操作: 对象属性
      person.job.type = 'UI'
      person.job.salary = '60k'

      // 操作: 嵌套对象内的属性
      person.a.b.c = 999

      // 操作: 数组
      person.course[1] = 'SpringSecurity'


    }

    // 返回一个对象(常用)
    return {
      person,
      updateInfo
    }
  }
}
</script>
