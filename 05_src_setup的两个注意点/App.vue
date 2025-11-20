<template>
 <h1>APP组件</h1>

 <!-- 引入自定义组件 -->
 <Demo @hello="tipHelloMsg" name="Jerry" :age="18">
    <template v-slot:qwe>
      <span>Vue3</span>
    </template>
    <template v-slot:asd>
      <span>Vue3:ASD</span>
    </template>
 </Demo>

</template>

<script>
import Demo from './components/Demo'

export default {
  name: 'App',
  components:{
    Demo
  },
  setup(props) {
    
    // 方法
    function tipHelloMsg(value){
      alert(`App组件的自定义事件hell被触发了，收到的值:${value}`)
    }

    return {
      tipHelloMsg
    }
  }
}
</script>
