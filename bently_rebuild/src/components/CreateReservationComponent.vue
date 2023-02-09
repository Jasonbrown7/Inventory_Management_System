<template>
    <v-app id="inspire">
      <v-container>
        <h3 class="text-center">Create Reservation</h3>
        <v-form @submit.prevent="handleSubmitForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Start Date"
                v-model="reservation.startDate"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="End Date"
                v-model="reservation.endDate"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="User"
                v-model="reservation.user"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Item"
                v-model="reservation.item"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn block color="danger">Create</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-app>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      reservation: {
        startDate: "",
        endDate: "",
        user: "",
        item: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/reservation/create";

      axios
        .post(apiURL, this.reservation)
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
    },
  },
};
</script>
