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
//Jeff Carson
function isDateBeforeToday(date){
  const today = new Date()

  if (today < date){
    return false
  }
  else{
    return true
  }
}
//Jeff Carson
function isDateOver3MonthsFromToday(date){ 
  const today = new Date()
  today.setDate(today.getDate() + 90)

  if (date > today){
    return true
  }
  else{
    return false
  }
}
//Jeff Carson
function isReservationOver2Weeks(start, end){
  const diffInMilliseconds = Math.abs(start - end);
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays > 14;
}

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
    //Jeff Carson
    handleSubmitForm() {
      const startDateInput = document.getElementById("startDateInput").value;
      const endDateInput = document.getElementById("endDateInput").value;

      const postStartDate = new Date(this.reservation.startDate)
      const postEndDate = new Date(this.reservation.endDate)

      postStartDate.setDate(postStartDate.getDate() + 1)
      postEndDate.setDate(postEndDate.getDate() + 1)


      if (postStartDate < postEndDate && !isDateBeforeToday(postStartDate) && !isDateOver3MonthsFromToday(postEndDate) && !isReservationOver2Weeks(postStartDate, postEndDate)){
        console.log("good")
        let apiURL = "http://localhost:4000/api/reservation/create";

        axios
          .post(apiURL, 
          {
            startDate: postStartDate,
            endDate: postEndDate,
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
      else if (startDateInput == '' || endDateInput == ''){
        window.alert("Error: Please fill out BOTH fields")
      }
      else if (isDateBeforeToday(postStartDate)){
        window.alert("Error: Tomorrow is the earliest a reservation can start")
      }
      else if (isDateOver3MonthsFromToday(postEndDate)){
        window.alert("Error: Reservations can only be made up to 3 months in advance")
      }
      else if(isReservationOver2Weeks(postStartDate, postEndDate)){
        window.alert("Error: Reservations cannot be longer than 2 weeks")
      }
      else if (startDateInput == endDateInput){
        window.alert("Error: Start date and End date cannot be equal")
      }
      else if (startDateInput > endDateInput){
        window.alert("Error: Start date must come before end date")
      }
      else{
        window.alert("Error: Something went wrong, please try again")
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
