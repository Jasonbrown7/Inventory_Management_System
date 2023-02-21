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
              <!--
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="User"
                    v-model="reservation.user"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Item"
                    v-model="reservation.item"
                    required
                  />
                </v-col>
              </v-row>
              -->
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
      };
    },
    created() {
      let apiURL = `http://localhost:4000/api/reservation/edit/${this.$route.params.id}`;
  
      axios.get(apiURL).then((res) => {
        this.reservation = res.data;
      });
    },
    methods: {
      handleUpdateForm() {

        const startDateInput = document.getElementById("startDateInput").value;
        const endDateInput = document.getElementById("endDateInput").value;

        if (startDateInput < endDateInput){
          let apiURL = `http://localhost:4000/api/reservation/update/${this.$route.params.id}`;
    
          axios
            .put(apiURL, this.reservation)
            .then((res) => {
              console.log(res);
              this.$router.push("/view/reservations");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else{
          window.alert("Error: Start date must come before end date")
        }
      },
    },
  };
  </script>