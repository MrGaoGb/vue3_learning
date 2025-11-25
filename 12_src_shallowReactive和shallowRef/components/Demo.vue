<template>
  <h4>当前x的值是:{{ x }}</h4>
  <h4>当前y的值是:{{ y }}</h4>
  <h4>当前u的值是:{{ z.u }}</h4>
  <h4>当前w的值是:{{ v.w }}</h4>
  <button @click="x++">x值++</button>
  <button @click="y++">y值++</button>
  <br>
  <button @click="z.u++">u值++</button>
  <button @click="v.w++">w值++</button>
  <hr>
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
import {reactive,ref,shallowReactive,shallowRef,toRefs} from 'vue'

export default {
  name: 'Demo',
  setup(props,context) {

    // 此处对象person也使用ref
    // let person = reactive({ 
    let person = shallowReactive({ // 只考虑第一层数据的响应式
      name:'张三',
      age:18,
      job:{
        j1:{
          salary:30
        }
      }
    })

    // 基本类型(对于基本类型时，ref 和 shallowRef 二者没有任何区别)
    const x = ref(0);
    const y = shallowRef(0);
    
    // 对象类型(对于对象类型，若为对象时，ref会转交给reactive,故变量u仍是响应式数据)
    // 而shallowRef中的w变量不是响应式数据
    const z = ref({
      u:0
    })
    console.log('###',z);
    
    const v = shallowRef({
      w:0
    })
    console.log('%%%',v);
    
    /**
     * 小结：虽然变量z和变量v都是RefImpl对象，但是z中的value属性为Proxy(代理对象，所以对u变量操作属于响应式)
     * 而v中的value属性为Object(普通对象，所以对w变量操作非响应式)
     */


    return {
      x,
      y,
      z,
      v,
      person,
      ...toRefs(person)
    }
    
  }
}
</script>
