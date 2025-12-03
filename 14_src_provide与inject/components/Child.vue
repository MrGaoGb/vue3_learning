<template>
  <div class="child">
    <h3>这是Child(子)组件</h3>
    <Son></Son>
  </div>
</template>

<script>
import Son from './Son';
export default {
  name:'Child',
  components:{
    Son
  }
}
</script>

<style>
  .child{
    background-color: skyblue;
    padding: 10px;
  }

</style>