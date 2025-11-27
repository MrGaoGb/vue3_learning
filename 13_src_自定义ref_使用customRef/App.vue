<template>
 <input type="text" v-model="keyWords">
 <h3>{{ keyWords }}</h3>
</template>

<script>
import {customRef, ref} from 'vue'

export default {
  name: 'App',
  setup(props) {
    
    // let keyWords = ref("app") // vue提供的内置的ref

    // 自定义一个ref，名为: myRef
    function myRef(value){
      let timer 
      const x = customRef((track,trigger) => {
        return {
          get(){
            console.log(`有人从myRef中读取数据了，读取的数据是：${value}`);
            track() // 通过vue追踪数据value的变化
            return value
          },
          set(newValue){
            console.log(`有人从myRef中修改数据了，修改后的数据是：${value}`);
            
            // value = newValue
            // trigger()// 通知vue重新解析模板

            // 防抖
            clearTimeout(timer)

            // 延时500ms之后展示
           timer = setTimeout(() => {
              value = newValue
              trigger()// 通知vue重新解析模板
            }, 500);
          }
        }
      })
      
      return x
    }

    let keyWords = myRef("app")


    return {keyWords}
  }
}
</script>
