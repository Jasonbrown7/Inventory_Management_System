<template>
  <div class="home">
    <ViewItemsComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import ViewItemsComponent from '@/components/ViewItemsComponent.vue'

export default {
  name: 'view-items',
  components: {
    ViewItemsComponent
  }
}
</script>
