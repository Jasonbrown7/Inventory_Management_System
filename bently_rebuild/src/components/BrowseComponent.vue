<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/extended-toolbar.vue-->
<!-- eslint-disable -->
<template>
  <v-app>
    <v-main class="v-main grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-toolbar color="grey lighten-3" elevation="0">
            </v-toolbar>  
              <!--
              Filters on the left side of the page for the user to choose from.
              All items are displayed by default unless filters are specifically set.
              User can also set desired reservation dates which will filter items, and pass said values to viewitem page
              -->
            <v-sheet rounded="lg">
              <v-subheader> Sort By: </v-subheader>
              <v-list rounded="lg">
                <v-select label="Availability" :items="dropdownAvailability" v-model="selectedAvailability">
                  <v-tooltip activator="parent" location="left">
                  Click to reset all filters.
                </v-tooltip>
                </v-select>
                <v-select label="Condition" :items="dropdownConditions" v-model="selectedCondition"></v-select>
                <v-text-field label="Desired Check-In Date" type="date" v-model="checkIn" required />
                <v-text-field label="Desired Check-Out Date" type="date" v-model="checkOut" required />
                <v-divider class="my-2"></v-divider>

                
                <v-list-item
                  link
                  color="grey-lighten-4"
                  @click="reloadSite"
                >  
                  <v-list-item-title>
                    Reset
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>


          <!--Browse Title-->
          <v-col>
            <v-toolbar color="grey lighten-3" elevation="0">
              <v-toolbar-title style="font-size: 30px;">Browse</v-toolbar-title>
              <v-spacer></v-spacer>
              <input type="text" v-model="input" placeholder="Search by item" class="pl-2" style="background-color: white; border: 1px solid grey; border-radius: 5px;" />
            </v-toolbar> 
            

             <!--
              Filters items based on filter criteria. Calls computed on the list of items that returns a filtered
              array of items to be displayed to the user. Image is displayed in the card with the name, condition, category, and availability below.
              User can go to viewitem page by clicking the btn to see further info.
             -->
              <div>
                <v-row>
                    <v-col
                      v-for="item in filteredItems" :key="item.id" cols="4">
                      <v-card class="mb-4" style="border-radius: 20px;">
                        <v-img :src="item.image" height="200" width="100%" object-fit="cover"></v-img>
                        <v-card-title class="text-h5 pt-2 pb-0">{{ item.name }}</v-card-title>
                        <v-card-text class="pt-4">
                          <div class="d-flex align-center">
                            <span class="mr-2">{{ item.category }}</span>
                            <span class="mr-2">&bull;</span>
                            <span class="mr-2">{{ item.condition }}</span>
                          </div>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" text :to="{ name: 'browse-itempage', params: { id: item._id } }">View details</v-btn>
                          <v-spacer></v-spacer>
                          <v-chip small :color="item.availability === 'Available' ? 'success' : 'error'">{{ item.availability }}</v-chip>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row> 
               </div>        
          </v-col>
        </v-row>
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
