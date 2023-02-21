<template>
    <div class="home">
      <EditUserComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import EditUserComponent from '@/components/EditUserComponent.vue'
  
  export default {
    name: 'edit-user',
    components: {
        EditUserComponent
    }
  }
  </script>