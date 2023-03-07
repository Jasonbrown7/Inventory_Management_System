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
                <v-list rounded="lg">
                  <v-subheader class="justify-left">Reports</v-subheader>
                  <v-btn color="primary" outlined @click="exportCsv" class="mt-1 mb-2">Export CSV</v-btn>
                  <v-divider class="ma-3"></v-divider>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    @click="reloadPage()"
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
              <v-toolbar-title style="font-size: 30px;">Admin - Users</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" :to="{ name: 'create-users' }">Create User</v-btn>
            </v-toolbar>  

            <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Username</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">isAdmin</th>
                    <th class="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in Users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.isAdmin }}</td>
                    <td>
                      <v-btn
                        class="mr-md-1"
                        :to="{ name: 'edit-user', params: { id: user._id } }"
                        color="primary"
                        small
                      >
                        Edit
                      </v-btn>
                      <v-btn
                        class="ml-md-2"
                        @click.prevent="deleteUser(user._id)"
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
import Papa from 'papaparse';
import FileSaver from 'file-saver';

export default {
  data() {
    return {
      Users: [],
      Reservations: [],
    };
  },

  created() {
    let apiURL = "http://localhost:4000/api/user";
    axios.defaults.withCredentials = true;
    //Users
    axios
      .get(apiURL)
      .then((res) => {
        this.Users = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    //Reservation
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
    deleteUser(id) {
      let apiURL = `http://localhost:4000/api/user/delete/${id}`;
      let indexOfArrayItem = this.Users.findIndex((i) => i._id === id);

      let reserved = this.Reservations.some((reservation) => reservation.user === id);
      if (reserved) {
        alert("Cannot delete item because it is currently reserved.");
        return;
      }

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Users.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    reloadPage(){
      window.location.reload()
    },
    exportCsv() {
      let users = this.Users; 
      const csv = Papa.unparse(users);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      FileSaver.saveAs(blob, "users.csv");
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>