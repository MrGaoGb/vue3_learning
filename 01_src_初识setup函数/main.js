// 引入的是一个名为createApp的工厂函数
import { createApp, render } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')

// 创建应用实例对象-app（类似与之前Vue2中的vm，但app比vm更 "轻" ）
var app = createApp(App)

console.log('@@@',app);
// 挂载
app.mount("#app")

// setTimeout(() => {
//     app.unmount("#app")
// }, 5000);

// new Vue({
//     // el:"#app"
//     render: h => h(App)
// }).$mount('#app')
