<template>
  <v-app id="inspire">
    <v-main class="v-main grey lighten-3">
      <v-container>
        <v-card
          elevation="0"
          class="mx-auto px-md-6 pb-md-6 pt-md-4"
          max-width="600"
        >
          <h3 class="text-center">Edit Reservation</h3>
          <v-form 
            @submit.prevent="handleUpdateForm" 
          >
            <v-container class="justify-center">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Start Date"
                    v-model="reservation.startDate"
                    required
                    type="date"
                    id = "startDateInput"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="End Date"
                    v-model="reservation.endDate"
                    required
                    type="date"
                    id = "endDateInput"
                  />
                </v-col>
              </v-row>
              
              <v-row>
                <v-col cols="12">
                  <v-select
                    label="User"
                    v-model="reservation.user"
                    required
                    :items="Users.map(user => user.username)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    label="Item"
                    v-model="reservation.item"
                    required
                    :items="Items.map(item => item.name)"
                  />
                </v-col>
              </v-row>
              
              <v-row>
                <v-col cols="12">
                  <v-btn block color="danger justify-center" type="submit">Confirm</v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn block color="danger justify-center" :to="{ name: 'view-reservations'}"> Cancel </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

  
  <script>
import axios from "axios";

export default {
    data() {
      return {
        reservation: {},
        Users: [],
        Items: [],
      };
    },
  //   beforeCreate(){
  //   let apiURL = `http://localhost:4000/api/auth/admin`;
  //   axios
  //   .get(apiURL)
  //   .then((res) => {
  //     console.log(res.data)
     
  //   })
  //   .catch(() => {
  //       window.alert("ur not that guy pal!")
  //       this.$router.push("/");
  //     });
  // },
    created() {
      let apiURL = `http://localhost:4000/api/reservation/edit/${this.$route.params.id}`;
  
      axios.get(apiURL).then((res) => {
        this.reservation = res.data;
      });
      axios
      .get("http://localhost:4000/api/user")
      .then((res) => {
        this.Users = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/item")
      .then((res) => {
        this.Items = res.data;
      })
      .catch((error) => {
        console.log(error);
      });


    },
    methods: {
      handleUpdateForm() {

        const startDateInput = document.getElementById("startDateInput").value;
        const endDateInput = document.getElementById("endDateInput").value;

        const userIndex = this.Users.findIndex(user => user.username === this.reservation.user);
        const itemIndex = this.Items.findIndex(item => item.name === this.reservation.item);

        // console.log("startdate", this.reservation.startDate)
        // console.log("enddate", this.reservation.endDate)
        // console.log("user", this.Users[userIndex]._id)
        // console.log("item", this.Items[itemIndex]._id)


        if (startDateInput < endDateInput){
          let apiURL = `http://localhost:4000/api/reservation/update/${this.$route.params.id}`;
    
          axios
            .put(apiURL, 
            {
              startDate: this.reservation.startDate,
              endDate: this.reservation.endDate,
              user: this.Users[userIndex]._id,
              item: this.Items[itemIndex]._id,
            })
            .then((res) => {
              console.log(res);
              this.$router.push("/view/reservations");
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
  };
  </script>