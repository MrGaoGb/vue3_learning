<template>
  <h2>人员信息</h2>
  
  姓:<input type="text" v-model="person.firstName"/>
  <br>
  名:<input type="text" v-model="person.lastName"/>
  <br>
  全名:{{ person.fullName }}
  <br>
  全名:<input type="text" v-model="person.fullName"/>
</template>

<script>

// 引入ref函数
import {reactive, computed} from 'vue'

export default {
  name: 'Demo',
  setup(props,context) {
    
    let person = reactive({
      firstName:'张',
      lastName:'三'
    })

   // 计算属性 - 简写形式
  //  person.fullName =  computed(()=>{
  //     return person.firstName+"_"+person.lastName;
  //  })

   // 计算属性 - 完整写法
   person.fullName =  computed({
      // 当fullName属性被引用时被调用
      get(){
        return person.firstName+"-"+person.lastName;
      },
      // 当fullName属性被修改时调用
      set(value){
        console.log(`---fullName属性被修改了,修改后的值${value}`);
        const nameArr = value.split('-');
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
   })

    return {
      person,
      // fullName
    }
    
  }
}
</script>
