import { reactive,onMounted,onBeforeUnmount } from 'vue'

/**
 * 具名导出 ，导入时使用： import {usePoint} from '../hooks/usePoint'
 * @returns 
 */
// export function usePoint(){
//     // 坐标信息(实现鼠标"打点"相关数据)
//     let point = reactive({
//       x: 0,
//       y: 0
//     })

//     // 方法
//     function handlerPoint(event){
//       point.x = event.pageX
//       point.y = event.pageY
//       console.log('x',event.pageX,'y',event.pageY);
//     }

//     // 通过组合API的形式配置生命周期函数
//     onMounted(() => {
//       // 绑定一个点击事件
//       window.addEventListener('click', handlerPoint)
//     })

//     onBeforeUnmount(() => {
//       // 移除点击事件
//       window.removeEventListener('click',handlerPoint)
//     })

//     return point
// }

/**
 * 默认导出
 * 导入时：
 * @returns 
 */
export default function usePoint(){
    // 坐标信息(实现鼠标"打点"相关数据)
    let point = reactive({
      x: 0,
      y: 0
    })

    // 方法
    function handlerPoint(event){
      point.x = event.pageX
      point.y = event.pageY
      console.log('x',event.pageX,'y',event.pageY);
    }

    // 通过组合API的形式配置生命周期函数
    onMounted(() => {
      // 绑定一个点击事件
      window.addEventListener('click', handlerPoint)
    })

    onBeforeUnmount(() => {
      // 移除点击事件
      window.removeEventListener('click',handlerPoint)
    })

    return point
}
