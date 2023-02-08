<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Update Reservation</h3>
      <form @submit.prevent="handleUpdateForm">
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
          <button class="btn btn-danger btn-block">Update</button>
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
    },
  },
};
</script>