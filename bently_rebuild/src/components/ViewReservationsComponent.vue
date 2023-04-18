
<template>
    <v-app>
      <v-main class="v-main grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-toolbar color="grey lighten-3" elevation="0">
              </v-toolbar>  
              <v-sheet rounded="lg" class="sticky-top">
                <v-subheader class="justify-left">Search Item / User</v-subheader>
                <div style="display: flex; justify-content: center; flex: 1;">
                  <v-text-field v-model="search" append-icon="mdi-magnify" class="mx-3 my-0"></v-text-field>
                </div>
                <v-list rounded="lg">
                  <v-subheader>Filter by</v-subheader>

                  <v-radio-group v-model="selectedOption" row class="my-2">
                    <v-radio
                      label="Open"
                      @click="filterCurrentlyOpen = true; filterOverdue = false"
                      color="grey lighten-1"
                      value="currentlyActive"
                      class="mx-4 mb-4"
                    ></v-radio>
                    <v-radio
                      label="Overdue"
                      @click="filterOverdue = true; filterCurrentlyOpen = false"
                      color="grey lighten-1"
                      value="overdue"
                      class="mx-4"
                    ></v-radio>
                  </v-radio-group>
                  
                  <v-divider class="ma-3"></v-divider>
                  <v-subheader>Sort by</v-subheader>
                  <v-radio-group v-model="selected" row class="my-2">
                    <v-radio
                      label="Newest"
                      value="newest"
                      color="grey"
                      :class="{ 'white--text': selected !== 'newest' }"
                      @click="select('newest')"
                      class="mx-4 mb-4"
                    ></v-radio>
                    <v-radio
                      label="Oldest"
                      value="oldest"
                      color="grey"
                      :class="{ 'white--text': selected !== 'oldest' }"
                      @click="select('oldest')"
                      class="mx-4"
                    ></v-radio>
                  </v-radio-group>
                  <v-divider class="ma-3"></v-divider>
                  <v-subheader class="justify-left">Reports</v-subheader>
                  <div style="display: flex; justify-content: center; flex: 1;">
                    <v-btn color="primary" outlined @click="exportCsv" class="mt-1 mb-2">Export CSV</v-btn>
                  </div>
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
                      <th class="text-left">IsCheckedOut</th>
                      <th class="text-left"></th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reservation in paginatedReservations" :key="reservation.id">
                      <td class="text-left">{{reservation.startDate | toDateString}}</td>
                      <td class="text-left">{{reservation.endDate | toDateString}}</td>
                      <td class="text-left">{{reservation.user | displayUserFromId(Users) }}</td>
                      <td class="text-left">{{reservation.item | displayItemFromId(Items) }}</td>
                      <td class="text-left">{{reservation.item | displayItemIsCheckedOutFromId(Items)}}</td>
                      <td v-if="reservation.isOverdue===true" class="text-left ml-0 text-sm" style="color: red;">OVERDUE</td>
                      <td v-else class="text-left ml-1 text-xs" style="color: green;"></td>
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
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(filteredReservations.length / pagination.itemsPerPage)"
                    :items-per-page="pagination.itemsPerPage"
                />
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
      filterOverdue: false,
      search: '',
      pagination: {
        page: 1,
        itemsPerPage: 15,
      },
    };
  },
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
    displayItemIsCheckedOutFromId(itemId, Items){
      if(!itemId) return '';
      const myItem = Items.find(u => u._id === itemId);
      return myItem.isCheckedOut;
    }
  },
  // beforeCreate(){
  //   let apiURL = `http://localhost:4000/api/auth/admin`;
  //   axios
  //   .get(apiURL)
  //   .then((res) => {
  //     console.log(res.data)
     
  //   })
  //   .catch(() => {
  //       window.alert("ur not that guy pal!")
  //       this.$router.push("/");
  //     });
  // },
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
      if (this.filterCurrentlyOpen === true || this.filterOverdue === true || this.search) {
        return this.Reservations.filter(reservation => {
          const startDate = new Date(reservation.startDate);
          const endDate = new Date(reservation.endDate);
          const today = new Date();
          const itemObj = this.Items.find(item => item._id === reservation.item);
          const userObj = this.Users.find(user => user._id === reservation.user);
          if (this.filterCurrentlyOpen === true)
            return startDate <= today && today <= endDate && (itemObj.name.toLowerCase().includes(this.search.toLowerCase()) || userObj.username.toLowerCase().includes(this.search.toLowerCase()));
          else if (this.filterOverdue === true)
            return reservation.isOverdue === true && (itemObj.name.toLowerCase().includes(this.search.toLowerCase()) || userObj.username.toLowerCase().includes(this.search.toLowerCase()));
          else 
            return (itemObj.name.toLowerCase().includes(this.search.toLowerCase()) || userObj.username.toLowerCase().includes(this.search.toLowerCase()) || reservation.item.includes(this.search));
        });
      }
      else {
        return this.Reservations;
      }
    },
    updatedReservations() {
      // redefines what reservation.isOverdue equals to display warnings
      return this.filteredReservations.map((reservation) => {
        const today = new Date();
        const item = this.Items.find((i) => i._id === reservation.item);
        if (item && item.isCheckedOut && new Date(reservation.endDate) < today) {
          console.log("isCheckedOut: " + item.isCheckedOut)
          console.log("endDate: " + new Date(reservation.endDate))
          reservation.isOverdue = true;
        } else {
          reservation.isOverdue = false;
        }
        return reservation;
      });
    },
    paginatedReservations() {
      const start = (this.pagination.page - 1) * this.pagination.itemsPerPage;
      const end = start + this.pagination.itemsPerPage;
      return this.updatedReservations.slice(start, end);
    }
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

.error-row {
  background-color: #ffcccc;
}

.sticky-top {
    position: sticky;
    top: 100px;
}
</style>

