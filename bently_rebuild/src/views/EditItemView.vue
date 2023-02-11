<template>
    <div class="home">
      <EditItemComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import EditItemComponent from '@/components/EditItemComponent.vue'
  
  export default {
    name: 'EditItem',
    components: {
        EditItemComponent
    }
  }
  </script>
  