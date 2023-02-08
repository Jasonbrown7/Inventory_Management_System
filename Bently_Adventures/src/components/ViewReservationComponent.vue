<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>User</th>
            <th>Item</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in Reservations" :key="reservation._id">
            <td>{{ reservation.startDate }}</td>
            <td>{{ reservation.endDate }}</td>
            <td>{{ reservation.user }} </td>
            <td>{{ reservation.item }} </td>
            <td>
              <router-link
                :to="{ name: 'edit-reservation', params: { id: reservation._id } }"
                class="btn btn-success"
                >Edit
              </router-link>
              <button
                @click.prevent="deleteReservation(reservation._id)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Reservations: [],
    };
  },
  created() {
    let apiURL = "http://localhost:4000/api/reservation";
    axios
      .get(apiURL)
      .then((res) => {
        this.Reservations = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteReservation(id) {
      let apiURL = `http://localhost:4000/api/reservation/delete/${id}`;
      let indexOfArrayReservation = this.Reservations.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Reservations.splice(indexOfArrayReservation, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>
