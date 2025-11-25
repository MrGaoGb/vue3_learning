<template>
  <h3>当前累计的值：{{ sum }}</h3>
  <button @click="sum++">sum加1</button>
  <hr>
  <h2>当前点击的坐标: x: {{point.x}} ; y: {{point.y}}</h2>
</template>

<script>

// 引入ref函数
import {ref} from 'vue'
// 具名导出 要求必须跟定义的名称usePoint保持一致
// import {usePoint} from '../hooks/usePoint'
// 默认导出 函数名称不需要和定义的函数名一致，引入时可以自定义名称
import savePoint from '../hooks/usePoint'

export default {
  name: 'Demo',
  setup(props,context) {
    
    let sum = ref(0)
    
    /**
     * 以下方式仅为在单个组件内使用
     */
    // // 坐标信息(实现鼠标"打点"相关数据)
    // let point = reactive({
    //   x: 0,
    //   y: 0
    // })

    // // 方法
    // function handlerPoint(event){
    //   point.x = event.pageX
    //   point.y = event.pageY
    //   // console.log('x',event.pageX,'y',event.pageY);
    // }

    // // 通过组合API的形式配置生命周期函数
    // onMounted(() => {
    //   // 绑定一个点击事件
    //   window.addEventListener('click', handlerPoint)
    // })

    // onBeforeUnmount(() => {
    //   // 移除点击事件
    //   window.removeEventListener('click',handlerPoint)
    // })

    /**
     * 引入钩子函数hook
     */
    // let point = usePoint();
    let point = savePoint()

    return {
      sum,
      point
    }
  }
}
</script>
