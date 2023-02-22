<template>
    <div class="home">
      <MyReservationsComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import MyReservationsComponent from '@/components/MyReservationsComponent.vue'
  
  export default {
    name: 'MyReservationscomponent',
    components: {
        MyReservationsComponent
    }
  }
  </script>
  