<template>
    <div class="home">
      <CreateUserComponent/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import CreateUserComponent from '@/components/CreateUserComponent.vue'
    
    export default {
        name: 'CreateUser',
        components: {
            CreateUserComponent
        }
    }
</script>
  