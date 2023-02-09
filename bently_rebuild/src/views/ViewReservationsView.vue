<template>
    <div class="home">
      <ViewReservationsComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ViewReservationsComponent from '@/components/ViewReservationsComponent.vue'
  
  export default {
    name: 'ViewItems',
    components: {
        ViewReservationsComponent
    }
  }
  </script>
  