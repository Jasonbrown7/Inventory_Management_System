<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/extended-toolbar.vue-->
<!-- eslint-disable -->
<template>
  <v-app>
    <v-main color="white">
      <v-container>

          <!--Browse Title-->
          <v-col>  
            <v-toolbar color="white" elevation="0">
              <v-text-field label="Check In" type="date" v-model="checkIn" class="ma-3" required />
              <v-text-field label="Check Out" type="date" v-model="checkOut" class="ma-3" required />
              <v-select label="Availability" :items="dropdownAvailability" class="ma-3" v-model="selectedAvailability"></v-select>
              <v-select label="Condition" :items="dropdownConditions" class="ma-3" v-model="selectedCondition"></v-select>
              <input type="text" v-model="input" placeholder="Search by item" class="mx-3 mb-5"  style="background-color: white; border: 1px solid grey; border-radius: 5px;" />
            </v-toolbar> 
            

             <!--
              Filters items based on filter criteria. Calls computed on the list of items that returns a filtered
              array of items to be displayed to the user. Image is displayed in the card with the name, condition, category, and availability below.
              User can go to viewitem page by clicking the btn to see further info.
             -->
              <div>
                <v-row>
                    <v-col
                      v-for="item in filteredItems" :key="item.id" cols="3">
                      <v-card class="mb-4" elevation="0">
                        <router-link :to="{ name: 'browse-itempage', params: { id: item._id } }">
                          <v-img v-if="item.image"
                            :src="item.image" height="250" width="100%" object-fit="cover" style="border-radius: 20px;"></v-img>
                          <v-img v-else
                            src="../assets/noImage.png" height="250" width="100%" object-fit="cover" style="border-radius: 20px;"></v-img>
                        </router-link>
                        <v-card-actions class="pa-0">
                          <v-card-title class="text-h5 pt-2 pb-0">{{ item.name }}</v-card-title>
                          <v-spacer></v-spacer>
                          <v-chip 
                            v-if="item.availability !== 'Available'"
                            small :color="item.availability === 'Avaiable' ? 'success' : 'error'"  class="mt-2"
                            >{{ item.availability }}</v-chip>
                        </v-card-actions>
                        <v-card-text class="my-0 py-0">
                          <div class="d-flex align-center">
                            <span class="mr-2 my-0 p-0">{{ item.category }}</span>
                            <span class="mr-2 my-0 p-0">&bull;</span>
                            <span class="mr-2 my-0 p-0">{{ item.condition }}</span>
                          </div>
                        </v-card-text>
                        <v-card-actions>

                        
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row> 
               </div>        
          </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    data: () => ({
    
      dropdownAvailability: [
        {text: 'Available', value: 'Available'}, 
        {text: 'Not Available', value: 'Not Available'}, 
      ],
      selectedAvailability: '',

      dropdownConditions: [
        {text: 'New', value: 'New'}, 
        {text: 'Used', value: 'Used'}, 
        {text: 'Broken', value: 'Broken'}, 
      ],
      selectedCondition: '',
      checkin: 'null',
      checkout: 'null',
      Items: [],
      input: ''
    }),

    created() {
      let apiURL = "http://localhost:4000/api/item";
      axios
        .get(apiURL)
        .then((res) => {
          this.Items = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },


    // Computed function that returns filtered list of items to be displayed to the UI. Logic works as follows:
    // selectedAvailability/Condition is set to null to start.
    //
    // If user selects both an availability filter and condition filter, selectedAvailability and selectedCondition is set
    // to their correct values and items are filtered based on both values that are documented.
    //
    // IF the user selects an availability but not a condition, item.availability===this.selectedAvailability is set to the right value and
    // this.selectedCondition is set to opposite by the '!' operator condition will always return true, effectively ignoring the condition filter.
    // In this case, items with matching availability will be returned and any condition since condition always evaluates to true.
    //
    // This works similarly in the opposite way.
    //
    // If no filters are selected, both availability and conidition always evaluate to true, so all items are displayed.

    computed: {
    filteredItems() {
      return this.Items.filter(item => {
        const hasAvailability = !this.selectedAvailability || item.availability === this.selectedAvailability;
        const hasCondition = !this.selectedCondition || item.condition === this.selectedCondition;
        const hasSearch = !this.input || item.name.includes(this.input);
        return hasAvailability && hasCondition && hasSearch;
      });
    },
  },

  methods: {
    reloadSite() {
      location.reload();
    }
  },

  }
</script>
