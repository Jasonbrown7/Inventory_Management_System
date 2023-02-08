<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Create Reservation</h3>
      <form @submit.prevent="handleSubmitForm">

        <div class="form-group">
          <label>Start Date</label>
          <input
            type="date"
            class="form-control"
            v-model="reservation.startDate"
            required
          />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input
            type="date"
            class="form-control"
            v-model="reservation.endDate"
            required
          />
        </div>
        
        <div class="form-group">
          <label>User</label>
          <input
            type="text"
            class="form-control"
            v-model="reservation.user"
            required
          />
        </div>

        <div class="form-group">
          <label>Item</label>
          <input
            type="text"
            class="form-control"
            v-model="reservation.item"
            required
          />
        </div>


        <div class="form-group">
          <button class="btn btn-danger btn-block">Create</button>
        </div>
      </form>
    </div>
  </div>
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
