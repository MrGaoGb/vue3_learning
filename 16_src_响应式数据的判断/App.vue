<template>
  <div class="app">
    <h3>这是App(祖)组件, {{ name }} -- {{ price }}</h3>
  </div>
</template>

<script>
import { isProxy, isReactive, isReadonly, isRef, reactive,readonly,ref,toRefs} from 'vue';
export default {
  name:'App',
  components:{
    // Child
  },
  setup(){
    let car = reactive({
      name:'奔驰',
      price:'40W'
    })

    let sum = ref(0);

    let car2 = readonly(car);

    console.log('isRef',isRef(sum));
    console.log('isReactive',isReactive(car));
    console.log('isProxy',isProxy(car));
    console.log('isReadOnly',isReadonly(car2));
    console.log('isReadObly',isReadonly(sum));
  

    return {
      ...toRefs(car)
    }
  }
}
</script>

<style>
  .app{
    background-color: gray;
    padding: 10px;
  }

</style>