<template>
    <div class="home">
      <EditReservationComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import EditReservationComponent from '@/components/EditReservationComponent.vue'
  
  export default {
    name: 'EditReservation',
    components: {
        EditReservationComponent
    }
  }
  </script>