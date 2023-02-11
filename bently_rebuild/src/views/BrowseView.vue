<template>
    <div class="home">
      <BrowseComponent/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import BrowseComponent from '@/components/BrowseComponent.vue'
  
  export default {
    name: 'BrowseView',
    data: () => ({
      defaultDropdown: 'Any Category',
      dropdownItems: ['WinterSports', 'SummerSports', 'WaterSports'],
    }),

    components: {
        BrowseComponent
    }
  }
  </script>
  