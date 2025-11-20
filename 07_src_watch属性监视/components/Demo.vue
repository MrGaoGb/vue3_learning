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
  // vue2写法
  // watch:{
  //   // 简写形式
  //   // sum(newValue,oldValue){
  //   //   console.log('sum值被修改了', newValue,oldValue);
  //   // },
  //   // 完整写法
  //   // sum:{
  //   //   immediate:true,
  //   //   handler(newValue,oldValue){
  //   //     console.log('sum值被修改了', newValue,oldValue);
  //   //   }
  //   // }
  // },
  setup(props,context) {
    
    let sum = ref(0)
    let msg = ref('tom')

    let person = reactive({
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:30
        }
      }
    })

    // 普通函数写法
    // watch(sum,function(newValue,oldValue){
    //   console.log('sum值被修改了', newValue,oldValue);
    // })

    // 箭头函数写法 
    // 情况一：监视ref所定义的`一个`响应式数据
    // watch(sum,(newValue,oldValue)=>{
    //   console.log('sum值被修改了', newValue,oldValue);
    // },{immediate:true})

    // 情况二：监视ref所定义的`多个`响应式数据(跟数组的的排序有关)
    // 另外第三个参数 options 可配置属性，例如 immediate:true 或 deep:true
    // watch([msg,sum],(newValue,oldValue)=>{
    //   console.log('sum或msg值被修改了', newValue,oldValue);
    // },{immediate:true})


    // 情况三：监视reactive所定义的`一个`响应式数据全部属性
    /**
     * 注意：
     *  1、此处无法获取到oldValue
     *  2、强制开启了深度监视(deep配置无效)(版本已修复：deep配置有效)
     */
    // watch(person,(newValue,oldValue)=>{
    //   console.log('person值变了',newValue,oldValue);
    // },{deep:false})

    // 情况四：监视reactive所定义的`一个`响应式数据某个属性
    // 1、监听person中的age属性
    // watch(() => person.age ,(newValue,oldValue)=>{
    //   console.log('person的age属性的值变了',newValue,oldValue);      
    // })
    // 2、监听person中的name属性
    // watch(() => person.name ,(newValue,oldValue)=>{
    //   console.log('person的name属性的值变了',newValue,oldValue);      
    // })
    // 3、监听person中的salary属性
    // watch(() => person.job.j1.salary,(newValue,oldValue)=>{
    //   console.log('person.job.j1中的salary属性变了',newValue,oldValue);
    // })

    // 情况五：监视reactive所定义的`一个`响应式数据某些属性
    // watch([() => person.name,() => person.age],(newValue,oldValue) => {
    //   console.log('仅监视person中name或age属性变了',newValue,oldValue);  
    // })

    // 特殊情况
    // watch(() => person.job, (newValue,oldValue) => {
    //   console.log('监视person中的job(仍是一个对象)变化',newValue,oldValue);    
    // },{deep:true})// 此处由于监视是reactive所定义的对象中的某个属性，所以deep配置有效


    return {
      sum,
      msg,
      person
    }
    
  }
}
</script>
