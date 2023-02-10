<template>
    <div class="home">
      <CreateItemComponent/>
    </div>
</template>

<script>
  // @ is an alias to /src
  import CreateItemComponent from '@/components/CreateItemComponent.vue'
  
  export default {
    name: 'CreateItem',
    components: {
        CreateItemComponent
    }
  }
</script>
  