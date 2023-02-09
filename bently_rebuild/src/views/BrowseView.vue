<template>
    <div class="home">
      <BrowseComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import BrowseComponent from '@/components/BrowseComponent.vue'
  
  export default {
    name: 'ViewItems',
    components: {
        BrowseComponent
    }
  }
  </script>
  