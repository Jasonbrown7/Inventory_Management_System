<template>
  <v-app id="inspire">
    <v-main class="v-main grey lighten-3">
          <v-container>
              <v-toolbar color="grey lighten-3" elevation="0">
                  <v-toolbar-title style="font-size: 30px;">Item Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="edit" :to="{ name: 'browseView' }" class="mr-3">Back</v-btn>
              </v-toolbar>  
              <v-card elevation="0" class="mt-3">
                  <v-row no-gutters>
                      <v-col cols="12" md="6">
                          <v-img v-if="item.image"
                              :src="item.image" class="ma-5 rounded-lg" style="max-width: 600px; max-height: 400px;"></v-img>
                          <v-img v-else
                              src="../assets/noImage.png" class="ma-5 rounded-lg" style="max-width: 600px; max-height: 400px;"></v-img>
                      </v-col>
                      <v-col cols="12" md="6">
                          <v-card elevation="0" class="mt-3">
                              <v-row>
                                  <v-col>
                                      <v-card-title class="ml-1 text-h6 text-md-h5 text-lg-h4 font-weight-bold">{{ item.name }}</v-card-title>
                                  </v-col>
                              </v-row>
                              <v-divider class="mb-4 ml-3 mr-3"></v-divider>
                              <v-row>
                                  <v-col cols="3">
                                      <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Description</v-sheet>
                                  </v-col>
                                  <v-col cols="9">
                                      <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">This item is one of Bently Adventure's most popular! Be sure to reserve it before its gone!</v-sheet>
                                  </v-col>
                              </v-row>
                              <v-row>
                                  <v-col>
                                      <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Condition</v-sheet>
                                  </v-col>
                                  <v-col  cols="9">
                                      <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                          {{ item.condition }}
                                      </v-sheet>
                                  </v-col>
                              </v-row>
                              <v-row>
                                  <v-col>
                                      <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Availabilility</v-sheet>
                                  </v-col>
                                  <v-col  cols="9">
                                      <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                          {{ item.availability }}
                                      </v-sheet>
                                  </v-col>
                              </v-row>
                              <v-row>
                                  <v-col>
                                      <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Reviews</v-sheet>
                                  </v-col>
                                  <v-col  cols="9">
                                      <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">[  Great  ,  Loved them!  ,  Not my size but worked well  ,  My go-to's  ]</v-sheet>
                                  </v-col>
                              </v-row>
                          </v-card>
                      </v-col>
                  </v-row>
              </v-card>
          </v-container>
          <v-container>
                  <v-row>
                      <v-col cols="12" md="6">
                          <div class="d-flex flex-row mb-1 bg-surface-variant">
                              <div class="text-left text-h6">Availability</div>
                              <v-spacer></v-spacer>
                              <v-btn @click="$refs.calendar.prev()" plain class="mr-2">Prev</v-btn>
                              <v-btn @click="$refs.calendar.next()" plain class="ml-1">Next</v-btn>
                          </div>
                              <!--Calendar Template from https://v15.vuetifyjs.com/en/components/calendars/ -->
                              <v-layout wrap>
                                  <v-flex xs12 class="mb-3">
                                  <v-sheet height="500">
                                      <v-calendar ref="calendar" color="edit" :events="events"></v-calendar>
                                  </v-sheet>
                                  </v-flex>
                              </v-layout>
                      </v-col>
                      <v-col cols="12" md="6">
                              <div style="font-size: 30px;" class="text-left ml-0 mb-2 text-h6">Reservation Dates</div>
                              <v-form @submit.prevent="handleSubmitForm">
                                <v-card style="height: 100%;">
                                  <v-card-text>
                                      <v-text-field label="Reservation Start Date" type="date" v-model="reservation.startDate" id = "startDateInput" required />
                                      <v-text-field label="Reservation End Date" type="date" v-model="reservation.endDate" id = "endDateInput" required />
                                  </v-card-text>
                                  <v-card-actions class="d-flex justify-center">
                                    <v-btn block color="danger justify-center" type = "submit">Reserve Item</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-form>
                      </v-col>
                  </v-row> 
          </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
import axios from "axios";

export default {
  
  data() {
    return {
      itemImage: "https://via.placeholder.com/300x200",
      itemDescription: "Sample Item Description",
      reviews: ["Great, love it.", "Okay, seen better", "Best item ive seen yet."],
      checkIn: "null",
      checkOut: "null",
      item: null ,
      user: {},
      reservation: {},
    };
  },
  methods: {
    handleSubmitForm() {


      const startDateInput = document.getElementById("startDateInput").value;
      const endDateInput = document.getElementById("endDateInput").value;

    

      if (startDateInput < endDateInput){
        let apiURL = "http://localhost:4000/api/reservation/create";

        axios
          .post(apiURL, 
          {
            startDate: this.reservation.startDate,
            endDate: this.reservation.endDate,
            user: this.user.id,
            item: this.item._id,

          
          })
          .then(() => {
            this.$router.push("/view/reservations");
            this.reservation = {
              startDate: "",
              endDate: "",
              user: "",
              item: "",
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else if (startDateInput == endDateInput){
        window.alert("Error: Start date and End date cannot be equal")
      }
      else{
        window.alert("Error: Start date must come before end date")
      }
    },
  },

  created() {
      
    let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;

      axios.get(apiURL).then((res) => {
        this.item = res.data;
      });
    let resApiURL = `http://localhost:4000/api/reservation/create/${this.$route.params.id}`;
    
        axios.get(resApiURL).then((res) => {
          this.reservation = res.data;
        });
  },
  mounted() {
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
            console.log(response);
            this.$set(this, "user", response.data.user)   
            console.log(this.user)
        })    
        .catch((errors) => {    
            console.log(errors)     
        })
  },
};
</script>