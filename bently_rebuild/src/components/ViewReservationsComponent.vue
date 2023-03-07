
<template>
    <v-app>
      <v-main class="v-main grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-toolbar color="grey lighten-3" elevation="0">
              </v-toolbar>  
              <v-sheet rounded="lg">
                <v-subheader class="justify-left">Search Item / User</v-subheader>
                <div style="display: flex; justify-content: center;">
                  <v-text-field v-model="search" style="max-width: 150px;" append-icon="mdi-magnify">
                  </v-text-field>
                </div>
                <v-list rounded="lg">
                  <v-subheader>Filter by</v-subheader>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    :class="{'white': !filterCurrentlyOpen, 'grey lighten-1': filterCurrentlyOpen}"
                    @click="filterCurrentlyOpen = !filterCurrentlyOpen"
                  >
                    <v-list-item-title>Currently Active</v-list-item-title>
                  </v-list-item>
                  <v-divider class="ma-3"></v-divider>
                  <v-subheader>Sort by</v-subheader>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    :class="{ 'white': selected !== 'newest', 'grey lighten-1': selected === 'newest' }"
                    @click="select('newest')"
                  >
                    <v-list-item-title>Newest</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    :class="{ 'white': selected !== 'oldest', 'grey lighten-1': selected === 'oldest' }"
                    @click="select('oldest')"
                  >
                    <v-list-item-title>Oldest</v-list-item-title>
                  </v-list-item>
                  <v-divider class="ma-3"></v-divider>
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
                    <tr v-for="reservation in filteredReservations" :key="reservation.id">
                      <td class="text-left">{{reservation.startDate | toDateString}}</td>
                      <td class="text-left">{{reservation.endDate | toDateString}}</td>
                      <td class="text-left">{{reservation.user | displayUserFromId(Users) }}</td>
                      <td class="text-left">{{reservation.item | displayItemFromId(Items) }}</td>
                      <td class="text-left">
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
import Papa from 'papaparse';
import FileSaver from 'file-saver';

export default {
  data() {
    return {
      Reservations: [],
      Users: [],
      Items: [],
      links: [
          'startDate',
          'endDate',
          'user',
          'item',
        ],
      sortedByOldest: false,
      sortedByNewest: false,
      filterCurrentlyOpen: false, 
      search: '',
    };
  },
  //Jeffrey Carson
  filters:{
    toDateString(dateObj){
      if(!dateObj) return '';
      const date = new Date(dateObj) 
      return date.toLocaleDateString()
    },
    displayUserFromId(userId, Users){
      if(!userId) return '';
      const myUser = Users.find(u => u._id === userId);
      return myUser.username;
    },
    displayItemFromId(itemId, Items){
      if(!itemId) return '';
      const myItem = Items.find(u => u._id === itemId);
      return myItem.name;
    },
  },
  beforeCreate(){
    let apiURL = `http://localhost:4000/api/auth/admin`;
    axios
    .get(apiURL)
    .then((res) => {
      console.log(res.data)
     
    })
    .catch(() => {
        window.alert("ur not that guy pal!")
        this.$router.push("/");
      });
  },
  created() {
    axios
      .get("http://localhost:4000/api/reservation")
      .then((res) => {
        this.Reservations = res.data;
      })
      .catch((error) => {
        console.log(error);
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
  computed: {
    filteredReservations() {
      if (this.filterCurrentlyOpen === true || this.search) {
        return this.Reservations.filter(reservation => {
          const startDate = new Date(reservation.startDate);
          const endDate = new Date(reservation.endDate);
          const today = new Date();
          const itemObj = this.Items.find(item => item._id === reservation.item);
          const userObj = this.Users.find(user => user._id === reservation.user);
          if (this.filterCurrentlyOpen === true)
            return startDate <= today && today <= endDate && (itemObj.name.toLowerCase().includes(this.search.toLowerCase()) || userObj.username.toLowerCase().includes(this.search.toLowerCase()));
          else 
            return (itemObj.name.toLowerCase().includes(this.search.toLowerCase()) || userObj.username.toLowerCase().includes(this.search.toLowerCase()));
        });
      }
      else {
        return this.Reservations;
      }
    },

  },
  mounted(){
  
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
    sortByOldest() {
      if (!this.sortedByOldest) {
        this.Reservations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        this.sortedByOldest = true;
      } else {
        this.Reservations.reverse();
        this.sortedByOldest = false;
      }
    },
    sortByNewest() {
      if (!this.sortedByNewest) {
        this.Reservations.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
        this.sortedByNewest = true;
      } else {
        this.Reservations.reverse();
        this.sortedByNewest = false;
      }
    },
    select(option) {
      this.selected = option;
      if (option === 'newest') {
        this.sortByNewest();
      } else if (option === 'oldest') {
        this.sortByOldest();
      }
    },
    reloadPage(){
      window.location.reload()
    },
    exportCsv() {
      let reservations = this.Reservations;
      if (this.sortedByOldest) {
        reservations = this.Reservations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      } else if (this.sortedByNewest) {
        reservations = this.Reservations.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
      }  
      const csv = Papa.unparse(reservations);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      FileSaver.saveAs(blob, "reservations.csv");
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>

