<template>
 <h1>APP组件</h1>

 <!-- 引入自定义组件 -->
 <Demo></Demo>
</template>

<script>
import Demo from './components/Demo'

export default {
  name: 'App',
  components:{
    Demo
  }
}
</script>
