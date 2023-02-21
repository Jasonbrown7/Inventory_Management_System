<template>
  <v-app id="inspire">
    <v-container>
      <v-row mt="50">
        <v-col cols="7" class="mt-15">
          <v-img :src="item.image" height="300"/>
        </v-col>
        <v-col cols="5" class="mt-15">
          <v-form class="pt-10" @submit.prevent="handleSubmitForm">
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
      <v-row>
        <v-col cols="7">
          <v-card>
            <v-card-title class="headline">{{ item.name }}</v-card-title>
            <v-card-text>
              <p>{{ itemDescription }}</p>
            </v-card-text>
          </v-card>
          <v-card class="mt-3">
            <v-card-title class="headline">Properties</v-card-title>
            <v-card-text>
             <div v-if="item.availability === 'Available'">

             <p>{{user.id}}Type: {{ item.category }}</p>
             <p>{{item._id}}Availability: <span style="color: green;">{{ item.availability }}</span></p>
             <p>Condition: {{ item.condition }}</p>
          
             </div>
             <div v-else>

              <p>Type: {{ item.category }}</p>
              <p>Availability: <span style="color: red;">{{ item.availability }}</span></p>
              <p>Condition: {{ item.condition }}</p>
             </div>
            </v-card-text>
          </v-card>
          <v-card class="mt-3">
            <v-card-title class="headline">Reviews</v-card-title>
            <v-card-text>
              {{ reviews }}
            </v-card-text>
          </v-card>
        </v-col>


        
        
        <!-- TEST REMOVE -->
      </v-row>
    </v-container>
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
