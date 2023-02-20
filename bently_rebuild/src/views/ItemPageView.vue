<!-- Copy template -->
<template>
    <div class="itempage">
      <ItemPageComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ItemPageComponent from '@/components/ItemPageComponent.vue'
  
  export default {
    name: 'ItemPage',
    components: {
      ItemPageComponent
    }
  }
  </script>