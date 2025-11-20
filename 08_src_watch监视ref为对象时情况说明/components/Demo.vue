<template>
  <h3>当前累计的值：{{ sum }}</h3>
  <button @click="sum++">sum加1</button>
  <br>
  <h3>msg的值为:{{ msg }}</h3>
  <button @click="msg+='!'">修改msg的值</button>
  <br>
  <h3>姓名:{{ person.name }}</h3>
  <h3>年龄:{{ person.age }}</h3>
  <h3>薪水:{{ person.job.j1.salary }}K</h3>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age++">修改年龄</button>
  <button @click="person.job.j1.salary+=5">涨薪</button>
</template>

<script>

// 引入ref函数
import {ref,watch,reactive} from 'vue'

export default {
  name: 'Demo',
  setup(props,context) {
    
    let sum = ref(0)
    let msg = ref('tom')

    // 此处对象person也使用ref
    let person = ref({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:30
        }
      }
    })

    // 监视sum属性(watch实际监视的RefImpl对象)
    watch(sum,(newValue,oldValue) => {
      console.log('sum值变了',newValue,oldValue);
      
    })

    // 监视person对象(在使用ref的前提下)
    watch(person,(newValue,oldValue) => {
      console.log('person中某个内部属性的值变了',newValue,oldValue);
    },{deep:true})// 开启深度监视配置


    return {
      sum,
      msg,
      person
    }
    
  }
}
</script>
