
<template>
    <v-app>
      <v-main color="white">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-toolbar color="white" elevation="0">
              </v-toolbar>  
              <v-sheet rounded="lg" style="border: black">
                <v-list rounded="lg" class="grey lighten-3">
                  <v-subheader>Filter by</v-subheader>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    :class="{'grey lighten-3': !filterCurrentlyOpen, 'grey lighten-1': filterCurrentlyOpen}"
                    @click="filterCurrentlyOpen = !filterCurrentlyOpen"
                  >
                    <v-list-item-title>Currently Open</v-list-item-title>
                  </v-list-item>
                  <v-divider class="ma-3"></v-divider>
                  <v-subheader>Sort by</v-subheader>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    :class="{ 'grey lighten-3': selected !== 'newest', 'grey lighten-1': selected === 'newest' }"
                    @click="select('newest')"
                  >
                    <v-list-item-title>Newest</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    :class="{ 'grey lighten-3': selected !== 'oldest', 'grey lighten-1': selected === 'oldest' }"
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
              <v-toolbar color="white" elevation="0">
                <v-toolbar-title style="font-size: 30px;">Upcoming Reservations</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>  
              <v-header
                v-if="filteredUpcomingReservations.length === 0"
                >You have no upcoming reservations.</v-header>
              <v-simple-table
                v-else>
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
                    <tr v-for="reservation in filteredUpcomingReservations" :key="reservation.id">
                      <td>{{reservation.startDate | toDateString}}</td>
                      <td>{{reservation.endDate | toDateString}}</td>
                      <td>{{reservation.user | displayUserFromId(Users) }}</td>
                      <td>{{reservation.item | displayItemFromId(Items) }}</td>
                      <td>
                        
                        <v-btn v-if="!isItemCheckedOut(reservation.item)"
                          class="mr-md-1"
                          color="primary"
                          small
                          @click.prevent="checkOut(reservation.item)"
                        >
                            Check Out
                        </v-btn>
                        <v-btn
                          v-else
                          class="ml-md-2"
                          color="primary"
                          small
                          
                          @click.prevent="checkIn(reservation.item)"
                        >
                            Check In
                        </v-btn>
                        <v-btn
                          class="ml-md-2"
                          @click.prevent="deleteReservation(reservation._id)"
                          color="error"
                          outlined
                          small
                        >
                            Cancel
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>

                <v-toolbar color="white" elevation="0" class="mt-10">
                    <v-toolbar-title style="font-size: 30px;">Past Reservations</v-toolbar-title>
                    <v-spacer></v-spacer>
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
                        <tr v-for="reservation in filteredPastReservations" :key="reservation.id">
                        <td>{{reservation.startDate | toDateString}}</td>
                        <td>{{reservation.endDate | toDateString}}</td>
                        <td>{{reservation.user | displayUserFromId(Users) }}</td>
                        <td>{{reservation.item | displayItemFromId(Items) }}</td>
                        <td>
                            <v-btn
                            class="mr-md-1"
                            color="primary"
                            outlined
                            small
                            >
                                View Item
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
  created() {
    axios
      .get(`http://localhost:4000/api/reservation/${this.$route.params.user_id}`)
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
    filteredUpcomingReservations() {
      if (this.filterCurrentlyOpen === true) {
        return this.Reservations.filter(reservation => {
          const startDate = new Date(reservation.startDate);
          const endDate = new Date(reservation.endDate);
          const today = new Date();
          return startDate <= today && today <= endDate;
        });
      } else {
        return this.Reservations.filter(reservation => {
            const startDate = new Date(reservation.startDate);
            const today = new Date();
            return startDate >= today;
        });
      }
    },
    filteredPastReservations() {
        return this.Reservations.filter(reservation => {
            const startDate = new Date(reservation.startDate);
            const today = new Date();
            return startDate < today;
        });
    },

  },
  methods: {
    isItemCheckedOut(item_id){
      console.log("ITEM ID", item_id);
      const myItem = this.Items.find(u => u._id === item_id);
      console.log("MYITEM", myItem);
      return myItem.isCheckedOut;
    },

    checkOut(item_id){
      let apiURL = `http://localhost:4000/api/item/update/${item_id}`;
      axios
          .put(apiURL, {isCheckedOut : true})
          .then((res) => {
            console.log("YES", res);
            
          
          })
          .catch((error) => {
            console.log("NO", error);
          });
    
    },
    checkIn(item_id){
      let apiURL = `http://localhost:4000/api/item/update/${item_id}`;
      axios
          .put(apiURL, {isCheckedOut : false})
          .then((res) => {
            console.log("Checkin Success", res);
          
          })
          .catch((error) => {
            console.log("Checkin Fail", error);
          });
      
          
    },
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

