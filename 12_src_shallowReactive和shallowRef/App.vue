<template>
 <button @click="isShowDemo = !isShowDemo">显示/隐藏Demo组件</button>
 <br>
 <Demo v-if="isShowDemo"></Demo>
</template>

<script>
import {ref} from 'vue'
import Demo from './components/Demo'

export default {
  name: 'App',
  components:{
    Demo
  },
  setup(props) {
    let isShowDemo = ref(true)

    return {isShowDemo}
  }
}
</script>
