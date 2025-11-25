<template>
  <h4>person信息:{{ person }}</h4>
  <hr>
  <h3>姓名:{{ name }}</h3>
  <h3>年龄:{{ age }}</h3>
  <h3>薪水:{{ job.j1.salary }}K</h3>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="job.j1.salary+=5">涨薪</button>
</template>

<script>

// 引入ref函数
import {reactive,ref,toRef, toRefs} from 'vue'

export default {
  name: 'Demo',
  setup(props,context) {

    // 此处对象person也使用ref
    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:30
        }
      }
    })

    // 普通字符串
    const name1 = person.name
    console.log('%%%',name1);
    
    // RefImpl对象，映射person对象中的name
    // const name2 = toRef(person.name)
    // console.log('###',name2);
    
    // toRefs函数
    // const x = toRefs(person);
    // console.log('~~~~',x);
    

    return {
      person,
      
      // 由于toRefs之后是一个对象，那么通过 ...toRef(person) 将对象里的属性展开，那么template就可以得到相应的数据属性了 
      ...toRefs(person)
      
      // // toRef 可以修改相关的值，并修改的是person中的数据
      // name: toRef(person,'name'),
      // age: toRef(person,'age'),
      // salary: toRef(person.job.j1,'salary')
      
      // ref这块虽然相关的值可以修改，但是不会修改person中的数据
      // name: ref(person.name),
      // age: ref(person.age),
      // salary: ref(person.job.j1.salary)
    }
    
  }
}
</script>
