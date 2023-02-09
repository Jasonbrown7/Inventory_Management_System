<template>
    <div class="home">
      <CreateReservationComponent/>
    </div>
</template>

<script>
  // @ is an alias to /src
  import CreateReservationComponent from '@/components/CreateReservationComponent.vue'
  
  export default {
    name: 'CreateReservation',
    components: {
        CreateReservationComponent
    }
  }
</script>
  