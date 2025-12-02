<template>
  <div class="app">
      <h3>这是App组件</h3>
      <Child></Child>

      <!-- 
         Suspense
        作用: 等待异步组件时渲染一些额外内容,让应用有更好的体验

        使用步骤:
          - 异步引入组件
            ```javascript
              import { defineAsyncComponent } from 'vue';
              const Child = defineAsyncComponent(()=> import('./components/Child')) // 异步引入组件
            ```

          - 使用Suspense包裹组件,并配置好 `default`和`fallback`
              <template v-slot:default>
                <Child></Child>
              </template>
              <template v-slot:fallback>
                <h4>数据正在飞速加载中...</h4>
              </template>
      -->

      <!-- <Suspense>
        <template v-slot:default>
          <Child></Child>
        </template>
        <template v-slot:fallback>
          <h4>数据正在飞速加载中...</h4>
        </template>
      </Suspense> -->
  </div>
</template>

<script>
import Child from './components/Child.vue'; // 静态引入组件

// import { defineAsyncComponent } from 'vue';
// const Child = defineAsyncComponent(()=> import('./components/Child')) // 异步引入组件

export default {
  name:'App',
  components:{
    Child
  }
}
</script>

<style>

  .app{
    background-color: gray;
    padding: 10px;
  }
</style>