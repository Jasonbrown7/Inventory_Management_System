<template>
  <v-app id="inspire">
    <v-main class="v-main grey lighten-3">
          <v-container>
              <v-toolbar color="grey lighten-3" elevation="0">
                  <v-toolbar-title style="font-size: 30px;">Item Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="edit" :to="{ name: 'browseView' }" class="mr-3">Back</v-btn>
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
                          <v-card elevation="0" class="mt-3 item-details">
                              <v-row>
                                  <v-col>
                                      <v-card-title class="ml-1 text-h6 text-md-h5 text-lg-h4 font-weight-bold">{{ item.name }}</v-card-title>
                                  </v-col>
                              </v-row>
                              <v-divider class="mb-4 ml-3 mr-3"></v-divider>
                              <v-row>
                                  <v-col cols="3">
                                      <v-sheet class="px-1 py-0 ml-4 mr-2 my-0 text-left font-weight-bold">Description</v-sheet>
                                  </v-col>
                                  <v-col cols="9">
                                      <v-sheet class="px-1 py-0 ml-2 mr-2 my-0 text-left">
                                          {{ item.description }}
                                      </v-sheet>
                                  </v-col>
                              </v-row>
                              <v-row>
                                  <v-col>
                                      <v-sheet class="px-1 py-0 ml-4 mr-2 my-0 text-left font-weight-bold">Condition</v-sheet>
                                  </v-col>
                                  <v-col  cols="9">
                                      <v-sheet class="px-1 py-0 ml-2 mr-2 my-0 text-left">
                                          {{ item.condition }}
                                      </v-sheet>
                                  </v-col>
                              </v-row>
                              <v-row>
                                  <v-col>
                                      <v-sheet class="px-1 py-0 ml-4 mr-2 my-0 text-left font-weight-bold">Availabilility</v-sheet>
                                  </v-col>
                                  <v-col  cols="9">
                                      <v-sheet class="px-1 py-0 ml-2 mr-2 my-0 text-left">
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
                  <v-row>
                      <v-col cols="12" md="6">
                        <div class="d-flex flex-row mb-1 bg-surface-variant">
                              <div class="text-left text-h6">Comments</div>
                              <v-spacer></v-spacer>
                          </div>
                        <v-layout>
                          <v-flex xs12 class="mb-3">
                          <v-sheet height="500" class="overflow-y-auto">
                              <!-- <div style="font-size: 30px;" class="text-left ml-0 mb-2 text-h6">Reservation Dates</div> -->
                              <v-list three-line>
                                <template v-for="(item, index) in items">
                                  <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                                    v-text="item.header"
                                  ></v-subheader>

                                  <v-divider
                                    v-else-if="item.divider"
                                    :key="index"
                                    :inset="item.inset"
                                  ></v-divider>

                                  <v-list-item
                                    v-else
                                    :key="item.title"
                                  >
                                    <v-list-item-avatar>
                                      <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                      <v-list-item-title v-html="item.title"></v-list-item-title>
                                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-list>
                              <v-btn color="primary" class="mt-3" @click="showCommentDialog = true">Add Comment</v-btn>
                            </v-sheet>
                          </v-flex>
                          </v-layout>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="d-flex flex-row mb-1 bg-surface-variant">
                              <div class="text-left text-h6">Reserve</div>
                              <v-spacer></v-spacer>
                          </div>
                        <v-layout>
                          <v-flex xs12 class="mb-3">
                          <v-sheet height="500">
                              <!-- <div style="font-size: 30px;" class="text-left ml-0 mb-2 text-h6">Reservation Dates</div> -->
                              <v-form @submit.prevent="handleSubmitForm">
                                <v-card style="height: 500px;">
                                  <v-date-picker
                                    v-model="dates"
                                    :min=getCurrentDate
                                    :max=get3MonthsFromNow
                                    full-width
                                    range
                                  ></v-date-picker>
                                  <!-- <v-card-text>
                                      <v-text-field label="Reservation Start Date" type="date" v-model="reservation.startDate" id = "startDateInput" required />
                                      <v-text-field label="Reservation End Date" type="date" v-model="reservation.endDate" id = "endDateInput" required />
                                  </v-card-text> -->

                                  <v-card-actions class="d-flex justify-center pt-5 mt-5">
                                    <v-btn block color="danger justify-center" type = "submit">Reserve Item</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-form>

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
//Jeff Carson
function isDateBeforeToday(date){
  const today = new Date()

  if (today < date){
    return false
  }
  else{
    return true
  }
}
//Jeff Carson
function isDateOver3MonthsFromToday(date){ 
  const today = new Date()
  today.setDate(today.getDate() + 90)

  if (date > today){
    return true
  }
  else{
    return false
  }
}
//Jeff Carson
function isReservationOver2Weeks(start, end){
  const diffInMilliseconds = Math.abs(start - end);
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays > 14;
}

import axios from "axios";

export default {
  
  data() {
    return {
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      dates: [],
      itemImage: "https://via.placeholder.com/300x200",
      itemDescription: "Sample Item Description",
      reviews: ["Great, love it.", "Okay, seen better", "Best item ive seen yet."],
      checkIn: "null",
      checkOut: "null",
      item: {} ,
      user: {},
      reservation: {},
    };
  },
  computed: {
    getCurrentDate(){
      var date = new Date();
      date = date.toISOString();
    
      return date.substring(0,9)
    },
    get3MonthsFromNow(){
      var date = new Date();
      date.setMonth(date.getMonth() + 3)
      date = date.toISOString();
    
      return date.substring(0,9)
    }
  },
  methods: {

    //Jeff Carson
    handleSubmitForm() {
      console.log("dates",this.dates)
      // const startDateInput = document.getElementById("startDateInput").value;
      // const endDateInput = document.getElementById("endDateInput").value;
      const startDateInput = new Date(this.dates[0])
      const endDateInput = new Date(this.dates[1])
      console.log(startDateInput, endDateInput)
      const postStartDate = new Date(this.reservation.startDate)
      const postEndDate = new Date(this.reservation.endDate)

      postStartDate.setDate(postStartDate.getDate() + 1)
      postEndDate.setDate(postEndDate.getDate() + 1)


      if (postStartDate < postEndDate && !isDateBeforeToday(postStartDate) && !isDateOver3MonthsFromToday(postEndDate) && !isReservationOver2Weeks(postStartDate, postEndDate)){
        console.log("good")
        let apiURL = "http://localhost:4000/api/reservation/create";

        axios
          .post(apiURL, 
          {
            startDate: postStartDate,
            endDate: postEndDate,
            user: this.user.id,
            item: this.item._id,
          })
          .then(() => {
            this.$router.push({name: 'my-reservations', params: {user_id: this.user.id} }),
            this.reservation = {
              startDate: "",
              endDate: "",
              user: "",
              item: "",
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else if (startDateInput == '' || endDateInput == ''){
        window.alert("Error: Please fill out BOTH fields")
      }
      else if (isDateBeforeToday(postStartDate)){
        window.alert("Error: Tomorrow is the earliest a reservation can start")
      }
      else if (isDateOver3MonthsFromToday(postEndDate)){
        window.alert("Error: Reservations can only be made up to 3 months in advance")
      }
      else if(isReservationOver2Weeks(postStartDate, postEndDate)){
        window.alert("Error: Reservations cannot be longer than 2 weeks")
      }
      else if (startDateInput == endDateInput){
        window.alert("Error: Start date and End date cannot be equal")
      }
      else if (startDateInput > endDateInput){
        window.alert("Error: Start date must come before end date")
      }
      else{
        window.alert("Error: Something went wrong, please try again")
      }
    },
  },
  created() {
      
    let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;

      axios.get(apiURL).then((res) => {
        this.item = res.data;
        const values = this.item.comments.values();
        console.log(this.item.comments);
        console.log(values);
        this.item.comments.forEach(comment => {this.reviews.push(comment.comment);})

          
      });
    let resApiURL = `http://localhost:4000/api/reservation/create/${this.$route.params.id}`;
    
        axios.get(resApiURL).then((res) => {
          this.reservation = res.data;
        });
        
  },
  mounted() {
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
            console.log(response);
            this.$set(this, "user", response.data.user)   
            console.log(this.user)
        })    
        .catch((errors) => {    
            console.log(errors)     
        })
  },
};
</script>

<style>
.v-list {
  flex: 1;
}

.item-details {
  display: flex;
  flex-direction: column;
  height: 95%;
}
</style>