<template>
    <v-app id="inspire">
      <v-app-bar flat>
        <v-container class="fill-height d-flex align-center">
          <v-avatar
            class="me-10 ms-4"
            color="grey-darken-1"
            size="32"
          ></v-avatar>
  
          <v-btn
            v-for="link in links"
            :key="link"
            variant="text"
          >
            {{ link }}
          </v-btn>
  
          <v-spacer></v-spacer>
          <v-responsive max-width="260">
            <v-text-field
              density="compact"
              hide-details
              variant="solo"
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list rounded="lg">
                  <v-list-item
                    v-for="n in 5"
                    :key="n"
                    link
                  >
                    <v-list-item-title>
                      Filter {{ n }}
                    </v-list-item-title>
                  </v-list-item>
  
                  <v-divider class="my-2"></v-divider>
  
                  <v-list-item
                    link
                    color="grey-lighten-4"
                  >
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-simple-table>
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
                </v-simple-table>
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
      Reservations: [],
      links: [
          'Upcoming',
          'Past',
          'All',
          'Filter By Date',
        ],
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
