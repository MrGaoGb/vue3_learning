<template>
  <div class="son">
    <h3>这是Son(孙)组件, {{ car.name }} --- {{ car.price }}</h3>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name:'Son',
  setup(){

   let car = inject('car')

   return {
    car
   }
  }
}
</script>

<style>
  .son{
    background-color: orange;
    padding: 10px;
  }

</style>