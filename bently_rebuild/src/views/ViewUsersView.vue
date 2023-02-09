<template>
    <div class="home">
      <ViewUsersComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ViewUsersComponent from '@/components/ViewUsersComponent.vue'
  
  export default {
    name: 'ViewUsers',
    components: {
        ViewUsersComponent
    }
  }
  </script>
  