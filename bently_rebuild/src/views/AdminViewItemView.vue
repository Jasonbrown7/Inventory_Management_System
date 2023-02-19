<template>
    <div class="admin-viewitem">
      <AdminViewItemComponent/>
    </div>
</template>

<script>
  // @ is an alias to /src
  import AdminViewItemComponent from '@/components/AdminViewItemComponent.vue';

  export default {
    name: 'admin-viewitem',
    components: {
        AdminViewItemComponent
    }
  }
</script>