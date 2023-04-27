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
                  <v-btn block color="danger justify-center" :to="{ name: 'view-reservations'}"> Back </v-btn>
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
        ogReservation: {},
        Users: [],
        Items: [],
        Reservations: [],
        conflictStart: "",
        conflictEnd: "",
      };
    },
    created() {
      let apiURL = `http://localhost:4000/api/reservation/edit/${this.$route.params.id}`;
  
      axios.get(apiURL).then((res) => {
        this.ogReservation = res.data;
        this.reservation = res.data;

        let tempStart = new Date(this.reservation.startDate)
        let tempEnd = new Date(this.reservation.endDate)

        tempStart.setDate(tempStart.getDate() - 1 )
        tempEnd.setDate(tempEnd.getDate() - 1 )

        tempStart = tempStart.toISOString()
        tempEnd = tempEnd.toISOString()

        this.reservation.startDate = tempStart.slice(0, 10);
        this.reservation.endDate = tempEnd.slice(0, 10);

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
    axios
      .get("http://localhost:4000/api/reservation")
      .then((res) => {
        this.Reservations = res.data;
      })
      .catch((error) => {
        console.log(error);
      });


    },
    methods: {

      isReservationConflict(reservations, start, end){
        const newStart = new Date(start)
        const newEnd = new Date(end)

        console.log(reservations)

        for (let i = 0; i < reservations.length; i++) {

          const reservationStartDate = new Date(reservations[i].startDate);
          const reservationEndDate = new Date(reservations[i].endDate);

          if ((newStart <= reservationEndDate && newEnd >= reservationStartDate) && (reservations[i]._id != this.ogReservation._id)) {
            // There is a conflict with the given start and end parameters
            this.conflictStart = reservationStartDate;
            this.conflictEnd = reservationEndDate;
            return true;
          }
        }
        // No conflicts found
        return false;
      },

      handleUpdateForm() {

        const startDateInput = document.getElementById("startDateInput").value;
        const endDateInput = document.getElementById("endDateInput").value;

        const userIndex = this.Users.findIndex(user => user.username === this.reservation.user);
        const itemIndex = this.Items.findIndex(item => item.name === this.reservation.item);

        const postStartDate = new Date(this.reservation.startDate)
        const postEndDate = new Date(this.reservation.endDate)

        postStartDate.setDate(postStartDate.getDate() + 1)
        postEndDate.setDate(postEndDate.getDate() + 1)

        const filteredReservations = this.Reservations.filter((reservation) => {
          return reservation.item === this.Items[itemIndex]._id;
        });

        if (startDateInput < endDateInput && !this.isReservationConflict(filteredReservations, postStartDate, postEndDate)){
          let apiURL = `http://localhost:4000/api/reservation/update/${this.$route.params.id}`;
    
          axios
            .put(apiURL, 
            {
              startDate: postStartDate,
              endDate: postEndDate,
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
        else if (this.isReservationConflict(filteredReservations, postStartDate, postEndDate)){
          this.conflictStart.setDate(this.conflictStart.getDate()-1)
          this.conflictEnd.setDate(this.conflictEnd.getDate()-1)
          window.alert("Error: The reservation dates entered conflict with another reservation for the "+ this.Items[itemIndex].name + " from "+ this.conflictStart.toISOString().slice(0, 10) + " to "+ this.conflictEnd.toISOString().slice(0, 10) +", try again.")
        }
        else{
          window.alert("Error: Start date must come before end date")
        }
      },
    },
  };
  </script>