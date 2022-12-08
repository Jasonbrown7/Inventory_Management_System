<template>
    <div>
        <h2 style="text-align: center;">My Reservations</h2>
        <div v-if="reservations.length === 0">
            You have no reservations.
        </div>
        <div v-else>
            <div class="container" style="display: flex; height: 100px;">
                <div style="display: flex;">
                    <table style="flex:1; margin-right: 1em;">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Date Reserved</th>
                            <th>Date Returned</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="reservation in reservations" :key="reservation.id" @click="selectedReservation = reservation">
                            <td>{{ reservation.itemName }}</td>
                            <td>{{ reservation.reservationDate }}</td>
                            <td>{{ reservation.returnDate }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-if="selectedReservation" style="background-color: white; flex: 1; border-radius: 10px; padding: 1em; border: 1px solid black; min-width: 200px; min-height: 200px; overflow: auto;">
                        <h2>{{ selectedReservation.itemName }}</h2>
                        <img :src="selectedReservation.itemPhoto" alt="Item photo" />
                        <p>{{ selectedReservation.itemDescription }}</p>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        reservations: [],
        selectedReservation: null
      }
    },
    created() {
        // retrieve previous reservations from API
        this.reservations = [
            {
            id: 1,
            itemName: "Skiis",
            reservationDate: "May 1, 2020",
            returnDate: "May 15, 2020",
            itemPhoto: "../assets/skiis.jpg",
            itemDescription: "The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922."
            },
            {
            id: 2,
            itemName: "Ski Poles",
            reservationDate: "May 16, 2020",
            returnDate: "May 30, 2020",
            itemPhoto: "../assets/skiipoles.png",
            itemDescription: "The Canon EOS Rebel T6i is a digital single-lens reflex camera featuring a 24.2 megapixel APS-C CMOS sensor, Full HD 1080p video recording at 30 fps, and built-in Wi-Fi and NFC connectivity."
            },
            {
            id: 3,
            itemName: "Sled",
            reservationDate: "June 1, 2020",
            returnDate: "June 15, 2020",
            itemPhoto: "../assets/sled3.jpg",
            itemDescription: "The Trek is the perfect bike for any weekend trip. Good condition."
            },
        ]
    }
  }
</script>

<style>
h1 {
    text-align: center;
}
table {
    margin: 0 auto;
    border-collapse: collapse;
    border-radius: 5px;
    background-color: #9AE599;
}
th, td {
    border: 1px solid #75BF49;
    padding: 0.5em;
}
</style>