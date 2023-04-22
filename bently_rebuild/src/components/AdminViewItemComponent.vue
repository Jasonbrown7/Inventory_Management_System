<template>
    <v-app id="inspire">
      <v-main class="v-main grey lighten-3">
            <v-container>
                <v-toolbar color="grey lighten-3" elevation="0">
                    <v-toolbar-title style="font-size: 30px;">Item Details</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="edit" :to="{ name: 'view-items' }" class="mr-3">Back</v-btn>
                    <v-btn color="primary" :to="{ name: 'edit-item' }">Edit Item</v-btn>
                </v-toolbar>  
                <v-card elevation="0" class="mt-3">
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-img v-if="item.image"
                                :src="item.image" class="ma-5 rounded-lg" style="max-width: 600px; max-height: 400px;"></v-img>
                            <v-img v-else
                                src="../assets/noImage.png" class="ma-5 rounded-lg" style="max-width: 600px; max-height: 400px;"></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card elevation="0" class="mt-3">
                                <v-row>
                                    <v-col>
                                        <v-card-title class="ml-1 text-h6 text-md-h5 text-lg-h4 font-weight-bold">{{ item.name }}</v-card-title>
                                    </v-col>
                                    <v-spacer v-if="item.isCheckedOut"></v-spacer>
                                    <v-col>
                                        <v-card-subtitle v-if="item.isCheckedOut" class="ml-1 text-h6 text-md-h7" style="color: grey;">Checked Out</v-card-subtitle>
                                    </v-col>
                                </v-row>
                                <v-divider class="mb-4 ml-3 mr-3"></v-divider>
                                <v-row>
                                    <v-col cols="3">
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Description</v-sheet>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                            {{ item.description }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Condition</v-sheet>
                                    </v-col>
                                    <v-col  cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                            {{ item.condition }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Availabilility</v-sheet>
                                    </v-col>
                                    <v-col  cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                            {{ item.availability }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
            <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <div style="font-size: 30px;" class="text-left ml-5 mb-2 text-h6">Reservations</div>
                            <v-spacer></v-spacer>
                            <v-header
                            v-if="filteredReservations.length === 0"
                            >This item has no reservation history</v-header>
                            <v-simple-table class="ml-5 mr-5" v-else>
                                <thead>
                                    <tr>
                                    <th class="text-left">Start</th>
                                    <th class="text-left">End</th>
                                    <th class="text-left">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="reservation in filteredReservations" :key="reservation.id">
                                        <td class="text-left"> {{reservation.startDate | toDateString}}</td>
                                        <td class="text-left"> {{reservation.endDate | toDateString}}</td>
                                        <td class="text-left"> {{reservation.user | displayUserFromId(Users)}}</td>
                                    </tr>
                                    
                                </tbody>
                            </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="d-flex flex-row mb-1 bg-surface-variant">
                                <div class="text-left text-h6">Availability</div>
                                <v-spacer></v-spacer>
                                <v-toolbar-title v-if="$refs.calendar">
                                    {{ $refs.calendar.title }}
                                </v-toolbar-title>
                                <v-btn @click="prevMonth" fab text small color="grey darken-2" >
                                    <v-icon small>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn @click="nextMonth" fab text small color="grey darken-2" >
                                    <v-icon small>mdi-chevron-right</v-icon>
                                </v-btn>
                            </div>
                                <!--Calendar Template from https://v15.vuetifyjs.com/en/components/calendars/ -->
                                <v-layout wrap>
                                    <v-flex xs12 class="mb-3">
                                    <v-sheet height="500">
                                        <v-calendar 
                                            v-show = "showCalendar"
                                            ref = "calendar" 
                                            v-model = "today"
                                            :type = "month"
                                            color = "primary"
                                            :key = "calendarKey"
                                            :events="events">
                                      </v-calendar>
                                    </v-sheet>
                                    </v-flex>
                                </v-layout>
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
        Users: [],
        Items: [],
        item: {},
        events: [],
        showCalendar: true,
      };
    },
//     beforeCreate(){
//     let apiURL = `http://localhost:4000/api/auth/admin`;
//     axios
//     .get(apiURL)
//     .then((res) => {
//       console.log(res.data)
     
//     })
//     .catch(() => {
//         window.alert("ur not that guy pal!")
//         this.$router.push("/");
//       });
//   },
    methods:{
        nextMonth(){
            this.showCalendar = false // hide calendar
            this.$nextTick(() => {
                this.$refs.calendar.next() // advance calendar
                this.showCalendar = true
            })
        },
        prevMonth(){
            this.showCalendar = false // hide calendar
            this.$nextTick(() => {
                this.$refs.calendar.prev() // advance calendar
                this.showCalendar = true
            })
        },
    },
  
    created() {
      let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;
      console.log("item.image", this.item.image)
      axios.get(apiURL).then((res) => {
        this.item = res.data;
      });
      axios
      .get("http://localhost:4000/api/reservation")
      .then(res => {

        this.Reservations = res.data;

        const filteredReservations = this.Reservations.filter((reservation) => {
          return reservation.item === this.item._id;
        });

        this.Reservations = filteredReservations;

        this.events = filteredReservations.map(reservation => ({
          name: "RESERVED",
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate),
        }))
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
    },
    computed: {
        filteredReservations() {
            //const today = new Date();
            //this.Reservations = this.Reservations.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
            //this.sortedByNewest = false;
            
            return this.Reservations.filter(reservation => reservation.item === this.item._id );
        },
    },
  };
</script>

<style scoped>
.rounded-lg {
  border-radius: 70px;
}
</style>