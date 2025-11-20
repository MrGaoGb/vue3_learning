<template>
  <h2>人员信息</h2>
  <h3>姓名:{{ person.name }}</h3>
  <h3>年龄:{{ person.age }}</h3>
  <br>
  <h2>收到的人员信息</h2>
  <h3>姓名:{{ name }}</h3>
  <h3>年龄:{{ age }}</h3>
  <br>
  <button @click="triggerHello">触发自定义事件</button>
  <br>
  <!-- <slot name="qwe"></slot>
  <slot name="asd"></slot> -->
</template>

<script>

// 引入ref函数
import {reactive} from 'vue'

export default {
  name: 'Demo',
  props:['name','age'],
  // beforeCreate(){
  //   console.log('DDD');
    
  // },
  // mounted(){
  //   console.log('xxxx',this.$attrs);
    
  // },
  emits:['hello'],
  setup(props,context) {
    // console.log('###',this); // 生命周期比beforeCreate还在，此时this的值为undefined
    
    // console.log('---', props.name+"_"+props.age);// 代表props属性声明接收的属性
    // console.log('---', context.attrs);// 相当于vc身上的$attrs(若props没有声明属性时，那么上一个组件传递的值在attrs身上)

    // 插槽(默认插槽、具名插槽、作用域插槽)
    console.log('---',context.slots);
    
    
    let person = reactive({
      name:'Tom',
      age:18
    })

    function triggerHello(){
      // 通过emit触发事件
      context.emit('hello',666)// 相当于vc组件中的$emit
    }


    return {
      person,
      triggerHello
    }
    
  }
}
</script>
