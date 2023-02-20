<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/constrained.vue-->
<template>
    <v-app>
      <v-main class="v-main grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-toolbar color="grey lighten-3" elevation="0">
              </v-toolbar>  
              <v-sheet rounded="lg">
                <v-subheader>Sort by</v-subheader>
                <v-list rounded="lg">
                  <v-list-item
                    v-for="link in links"
                    :key="link"
                  >
                    <v-list-item-title>
                      {{ link}}
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
              <v-toolbar color="grey lighten-3" elevation="0">
                <v-toolbar-title style="font-size: 30px;">Admin - Reservations</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" :to="{ name: 'create-reservations' }">Create Reservation</v-btn>
              </v-toolbar>  

              <v-simple-table>
                  <thead>
                    <tr>
                      <th class="text-left">Start Date</th>
                      <th class="text-left">End Date</th>
                      <th class="text-left">User</th>
                      <th class="text-left">Item</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reservation in Reservations" :key="reservation.id">
                      <td>{{ reservation.startDate }}</td>
                      <td>{{ reservation.endDate }}</td>
                      <td>{{ reservation.user }}</td>
                      <td>{{ reservation.item }}</td>
                      <td>
                        <v-btn
                          class="mr-md-1"
                          :to="{ name: 'edit-reservation', params: { id: reservation._id } }"
                          color="primary"
                          small
                        >
                          Edit
                        </v-btn>
                        <v-btn
                          class="ml-md-2"
                          @click.prevent="deleteReservation(reservation._id)"
                          color="primary"
                          outlined
                          small
                        >
                          Delete
                        </v-btn>
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
          'startDate',
          'endDate',
          'user',
          'item',
        ],
    };
  },
  // mounted() {
  //   axios.defaults.withCredentials = true; 
  //   axios.get("http://localhost:4000/api/auth/admin", {credentials: 'include'})    
  //       .then((response) => {    
  //           console.log(response)    
  //           //this.$set(this, "user", response.data.user)    
  //       })    
  //       .catch((errors) => {    
  //           console.log(errors, 'Cannot view all reservations unless logged in as admin.')  
  //           this.$router.push("/")  
  //       })
  //     },
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
