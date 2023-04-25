<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/extended-toolbar.vue-->
<!-- eslint-disable -->
<template>
  <v-app>
    <v-main class="v-main">
      <v-container>
          <!--Browse Title-->
          <v-col> 
            <v-toolbar elevation="0" class="mb-5 mt-6 pt-4 pb-4 align-items-center" style="border-radius: 20px;">
              <v-text-field label="Reservation Start" type="date" v-model="reservationStart" class="ma-3" required/>
              <v-text-field label="Reservation End" type="date" v-model="reservationEnd" class="ma-3" required/>
              <v-select style="max-width: 200px; color: black" label="Category" :items="dropdownCategory" class="ma-3" v-model="selectedCategory" ></v-select>
              <v-select style="max-width: 200px;" label="Condition" :items="dropdownConditions" class="ma-3" v-model="selectedCondition"></v-select>
              <v-text-field v-model="input" append-icon="mdi-magnify"> Search for an item
              </v-text-field>
              <!-- <v-autocomplete 
                append-icon="mdi-magnify"
                v-model="input" 
                :items="paginatedItems.map(item => item.name)"
                label="Search Item"
                @input = "resetInput"
                @click:append.stop
              ></v-autocomplete> -->
              
              <v-icon class="mb-5 ml-4" color="#26685d" @click="refreshFilters">mdi-refresh</v-icon>


              
             
            
            </v-toolbar> 
            

             <!--
              Filters items based on filter criteria. Calls computed on the list of items that returns a filtered
              array of items to be displayed to the user. Image is displayed in the card with the name, condition, category, and availability below.
              User can go to viewitem page by clicking the btn to see further info.
             -->
              <div>
                <v-row>
                    <v-col
                      v-for="item in paginatedItems" :key="item.id" cols="3">
                      <v-card background='#121212' class="mb-4" elevation="0" style="border-radius: 20px;">
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
                  <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(filteredItems.length / pagination.itemsPerPage)"
                    :total-visible="2"
                    color = "#26685d"
                  ></v-pagination>
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

      pagination: {
        page: 1,
        itemsPerPage: 16,
      },
    
      dropdownCategory: [
        {text: 'Winter Sports', value: 'Winter Sports'}, 
        {text: 'Summer Sports', value: 'Summer Sports'}, 
        {text: 'Water Sports', value: 'Water Sports'},
        {text: 'Leisure', value: 'Leisure'},
      ],
      selectedCategory: '',

      dropdownConditions: [
        {text: 'New', value: 'New'}, 
        {text: 'Used', value: 'Used'}, 
        {text: 'Broken', value: 'Broken'}, 
      ],
      selectedCondition: '',

      reservationStart: '',
      reservationEnd: '',

      Items: [],
      input: '',
      Reservations: [],
      darkMode: false,

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

      axios
      .get("http://localhost:4000/api/reservation")
      .then((res) => {
        this.Reservations = res.data;
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
          //The following code excludes reservations that overlap with the inputted dates. (Jeffrey Carson)
          const overlappingItems = []
          let compareReservationStart = new Date(this.reservationStart)
          let compareReservationEnd = new Date(this.reservationEnd)
          compareReservationStart.setDate(compareReservationStart.getDate() + 1)
          compareReservationEnd.setDate(compareReservationEnd.getDate() + 1)

          for (let i = 0; i < this.Reservations.length; i++){
            const reservation = this.Reservations[i];
            const reservationStartDate = new Date(this.Reservations[i].startDate);
            const reservationEndDate = new Date(this.Reservations[i].endDate);
            if (reservationStartDate <= compareReservationEnd && reservationEndDate >= compareReservationStart) {
              overlappingItems.push(reservation.item)
              continue;
            }
          }
          // --------------------

          const hasCategory = !this.selectedCategory || item.category=== this.selectedCategory;
          const hasCondition = !this.selectedCondition || item.condition === this.selectedCondition;
          const hasSearch = !this.input.toLowerCase() || item.name.toLowerCase().includes(this.input.toLowerCase());
          const doesntOverlap = (!this.reservationStart && !this.reservationEnd) || !overlappingItems.includes(item._id);

          return hasCategory && hasCondition && hasSearch && doesntOverlap;
        });
      },
  
      paginatedItems() {
        const start = (this.pagination.page - 1) * this.pagination.itemsPerPage;
        const end = start + this.pagination.itemsPerPage;
        return this.filteredItems.slice(start, end);
      },
      paginatedReservations() {
      const start = (this.pagination.page - 1) * this.pagination.itemsPerPage;
      const end = start + this.pagination.itemsPerPage;
      return this.updatedReservations.slice(start, end);
    },

    },

    methods: {
      resetInput(value) {
        if (!value) {
          this.input = '';
        }
      },

      refreshFilters() {
        this.selectedCategory = null
        this.selectedCondition = null
      }
    }
  }
</script>

<style> 
.v-pagination {
  margin-top: 15px;
}

/* Sets styling for down arrow on vselect element */
.v-input__icon--append .v-icon { 
  color: #26685d;
}

</style>