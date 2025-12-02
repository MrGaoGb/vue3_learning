<template>
    <div class="child">
        <h3>这是Child组件</h3>
        <h4>{{ sum }}</h4>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name:'Child',
    async setup(){
        let sum = ref(0)

        // return {
        //     sum
        // }

        let p = new Promise((resolve,reject) => {
           setTimeout(() => {
             resolve({sum})
           },3000)
        })

        return await p
    }
}
</script>

<style>
    .child{
        background-color: skyblue;
        padding: 10px;
    }
</style>