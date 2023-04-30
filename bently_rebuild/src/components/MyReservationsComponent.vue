
<template>
    <v-app>
      <v-main color="white">
        <v-container>
          <v-row>
            <v-col>
              <v-toolbar elevation="0" class="mt-10">
                    <v-toolbar-title style="font-size: 30px;">Current Reservations</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-alert
                      v-if="$route.query.showAlert && this.$route.params.item_name"
                      transition="slide-x-transition"
                      v-model = "showAlert"
                      border="right"
                      dense
                      type="success">
                      Successfully checked out the {{this.$route.params.item_name}} from {{this.$route.params.new_res_start.toDateString().slice(4, 10)}} to {{this.$route.params.new_res_end.toDateString().slice(4, 10)}}!
                    </v-alert>
                </v-toolbar>  
                <v-header
                  v-if="filteredCurrentReservations.length === 0"
                  >You have no current reservations.</v-header>
                <v-simple-table v-else>
                  <v-dialog
                              v-model="showCommentDialog"
                              persistent
                              max-width="600px"
                            >
                            <v-form @submit.prevent="addComment" >
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">Leave a review!</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>

                                        <v-text-field
                                          v-model="comment"
                                          label="Review"
                                          required
                                        ></v-text-field>
                                    </v-row>
                                  </v-container>
                                  
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="showCommentDialog = false; commentDone = true"
                                  >
                                    Close
                                  </v-btn>
                                  <v-btn
                                    type="submit"
                                    color="blue darken-1"
                                    text
                                    @click="showCommentDialog = false; commentDone = true"
                                  >
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-form>
                          </v-dialog>
                    <thead>
                        <tr>
                        <th class="text-left"> </th>
                        <th class="text-left">Start Date</th>
                        <th class="text-left">End Date</th>
                        <th class="text-left">User</th>
                        <th class="text-left">Item</th>
                        <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="reservation in filteredCurrentReservations" :key="reservation.id">
                        <td v-if="reservation.isOverdue===true" class="text-left ml-0 text-sm" style="color: red;">OVERDUE</td>
                        <td v-else class="text-left ml-1 text-xs" style="color: green;"></td>
                        <td>{{reservation.startDate | toDateString}}</td>
                        <td>{{reservation.endDate | toDateString}}</td>
                        <td>{{reservation.user | displayUserFromId(Users) }}</td>
                        <td>{{reservation.item | displayItemFromId(Items) }}</td>
                        <td>
                          <v-btn v-if="!isItemCheckedOut(reservation.item)"
                            class="mr-md-1"
                            :color="$vuetify.theme.dark ? undefined : 'primary'"
                            :text-color="$vuetify.theme.dark ? 'primary' : undefined"
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
                            
                            @click.prevent="checkIn(reservation.item, reservation)"
                          >
                              Check In
                          </v-btn>
                          <v-btn
                            class="ml-md-2"
                            @click.prevent="deleteReservation(reservation._id)"
                            :color="$vuetify.theme.dark ? undefined : 'primary'"
                            :text-color="$vuetify.theme.dark ? 'primary' : undefined"
                            outlined
                            small
                          >
                              Cancel
                          </v-btn>
                        </td>
                        </tr>
                    </tbody>
                  
                </v-simple-table>

              <v-toolbar elevation="0"  class="mt-10">
                <v-toolbar-title style="font-size: 30px;">Upcoming Reservations</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>  
              <v-header
                v-if="filteredUpcomingReservations.length === 0"
                >You have no upcoming reservations.</v-header>
              <v-simple-table v-else>
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
                        <v-btn
                            class="mr-md-1"
                            color="primary"
                            outlined
                            small
                            :to="{ name: 'browse-itempage', params: { id: reservation.item } }"
                            >
                                View Item
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

                <v-toolbar elevation="0" class="mt-10">
                    <v-toolbar-title style="font-size: 30px;">Past Reservations</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>  
                <v-header
                  v-if="filteredPastReservations.length === 0"
                  >You have no past reservations.</v-header>
                <v-simple-table v-else>
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
                            :to="{ name: 'browse-itempage', params: { id: reservation.item } }"
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
      item_id : '',
      showCommentDialog: false,
      commentDone: false,
      comment: '',
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
      user: {},
      showAlert: true
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
  // beforeCreate(){
  //   let apiURL = `http://localhost:4000/api/auth/user`;
  //   axios
  //   .get(apiURL)
  //   .then((res) => {
  //     console.log("bruh");
  //    if (res.data.user.id != this.$route.params.user_id ){

  //       window.alert("Not ur reservations pal!")
  //       this.$router.push("/");
  //    }
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //       this.$router.push("/");
  //     });
  // },
  mounted() {
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
        
          this.$set(this, "user", response.data.user);
          
        }) 
        .catch((errors) => {  
            console.log(errors);
            this.$set(this, "user", {})

        })   
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
        return this.Reservations.filter(reservation => {
            const startDate = new Date(reservation.startDate);
            const today = new Date();
            return startDate >= today;
        });
      },
    
    filteredPastReservations() {
        return this.Reservations.filter(reservation => {
          const today = new Date();
          const myItem = this.Items.find(item => item._id === reservation.item)
          if (myItem && myItem.isCheckedOut && new Date(reservation.endDate) < today) {
            reservation.isOverdue = true;
          } else {
            reservation.isOverdue = false;
          }
          const startDate = new Date(reservation.startDate);
          return startDate < today && !reservation.isOverdue && reservation.hasBeenReturned;
        });
    },
    filteredCurrentReservations() {
        return this.Reservations.filter(reservation => {
          const today = new Date();
          const myItem = this.Items.find(item => item._id === reservation.item)
          if (myItem && myItem.isCheckedOut && new Date(reservation.endDate) < today) {
            reservation.isOverdue = true;
          } else {
            reservation.isOverdue = false;
          }
          const startDate = new Date(reservation.startDate);
          const endDate = new Date(reservation.endDate);
          return (startDate <= today && today <= endDate || reservation.isOverdue) && !reservation.hasBeenReturned;
        });
    },
  },
  
  methods: {
    getCurrentDateMethod(){
      var date = new Date();
      date = date.toISOString();
    
      return date.substring(0,10)
    },
    isItemCheckedOut(item_id){
      console.log("ITEM ID", item_id);
      const myItem = this.Items.find(item => item._id === item_id);
      console.log("MYITEM", myItem);
      console.log("MYITEM.isCheckedOut", myItem.isCheckedOut);
      return myItem.isCheckedOut;
    },

    checkOut(item_id){
      let apiURL = `http://localhost:4000/api/item/update/${item_id}`;
      axios
          .put(apiURL, {isCheckedOut : true})
          .then((res) => {
            console.log("YES", res);
            this.reloadPage();
          
          })
          .catch((error) => {
            console.log("NO", error);
          });
    
    },
    checkIn(item_id, reservation) {
      this.showCommentDialog = true;
      this.item_id = item_id;

      let itemApiURL = `http://localhost:4000/api/item/update/${item_id}`;
      let reservationApiURL = `http://localhost:4000/api/reservation/update/${reservation._id}`;

      // new Promise code block is original, then statements are from stackOverflow
      return new Promise((resolve) => {
        const waitForCommentDone = () => {
          if (this.commentDone) {
            resolve();
          } else {
            setTimeout(waitForCommentDone, 100);
          }
        };
        waitForCommentDone();
      }).then(() => {
        return axios.put(itemApiURL, {isCheckedOut : false});
      }).then(() => {
        reservation.hasBeenReturned = true;
        return axios.put(reservationApiURL, reservation);
      }).then((res) => {
        console.log(res);
        this.item_id ='';
      }).catch((error) => {
        console.log("Check-in Fail", error);
      });
    },
    addComment(){
      let apiURL = `http://localhost:4000/api/item/update/comments/${this.item_id}`;
      axios
        .put(apiURL, {
          comment: this.comment,
          author: this.user.id,
          date: this.getCurrentDateMethod(),
          pic: this.user.pic
        })
        .then(response => {
          console.log(response);
          this.showCommentDialog = false;
          this.comment = "";
        })
        .catch(error => {
          console.log("addecomment", error);
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


