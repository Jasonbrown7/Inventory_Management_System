<template>
    <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
        <h2 style="text-align: center;">My Reservations</h2>
        <div v-if="reservations.length === 0">
            You have no reservations.
        </div>
        <div v-else>
            <div class="container" style="display: flex; height: 100px;">
                <div>
                    <h6 style="margin-top: 5px;">Upcoming Reservations</h6>
                    <table class="styled-table" style="background-color: #f3f3f3; flex:1; margin-right: 1em; border-radius: 10px; table-layout: fixed; width: 500px;margin-bottom: 15px;">
                        <thead>
                        <tr>
                            <th style="border-top-left-radius: 10px; width: 150px;" >Item</th>
                            <th style="width: 130px;">Start Date</th>
                            <th style="width: 130px;">Return Date</th>
                            <th style="width: 110px;" >Check Out</th>
                            <th style="border-top-right-radius: 10px; width: 90px;">Check In</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="reservation in futureReservations" :key="reservation.id" @click="selectedReservation = reservation" :class="{'bold': selectedReservation == reservation}">
                            <td style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;" >{{ reservation.itemName }}</td>
                            <td>{{ reservation.startDate }}</td>
                            <td>{{ reservation.returnDate }}</td>
                            <td v-if="isstartDateInFuture(reservation)">
                            <button @click="checkOutItem(reservation)" style="background-color: white; border-radius: 10px;">Check Out</button>
                            </td>
                            <td v-else>
                            <tr>N/A</tr>
                            </td>
                            <td v-if="isstartDateInFuture(reservation)"  style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;">
                            <button @click="checkOutItem(reservation)" style="background-color: white; border-radius: 10px;">Return</button>
                            </td>
                            <td v-else>
                            <tr style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;">N/A</tr>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h6 style="margin-top: 30px; ">Reservation History</h6>
                    <table class="styled-table" style="background-color: #f3f3f3; flex:1; margin-right: 1em; border-radius: 10px; table-layout: fixed; width: 500px;margin-bottom: 15px;">
                        <thead>
                            <tr>
                                <th style="border-top-left-radius: 10px;" >Item</th>
                                <th>Start Date</th>
                                <th style="border-top-right-radius: 10px;">Return Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="reservation in pastReservations" :key="reservation.id" @click="selectedReservation = reservation" :class="{'bold': selectedReservation == reservation}">
                                <td style="border-top-left-radius: 5px; border-bottom-left-radius: 5px;" >{{ reservation.itemName }}</td>
                                <td>{{ reservation.startDate }}</td>
                                <td style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;">{{ reservation.returnDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="display: flex; margin-top: 32px; margin-bottom: 15px;">
                    <div v-if="selectedReservation" style="background-color: #abd4ab; flex: 1; border-radius: 10px; padding: 1em; border: 1px solid white; min-width: 200px; min-height: 437px; overflow: auto;">
                            <h2 style="text-align: center;">{{ selectedReservation.itemName }}</h2>
                            <div style="flex: 1; border: 1px solid black; background-color: white; width: 100px; height: 100px; text-align: center; margin: 0 auto; min-width: 200px; min-height: 200px;">Item Image here</div>
                            <h6 style="padding-top: 20px;">Condition: {{ selectedReservation.condition }}</h6>
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
        // retrieve previous reservations from API // Hardcoded
        this.reservations = [
            {
            id: 1,
            itemName: "Skis - Woman",
            startDate: "May 1, 2020",
            returnDate: "May 15, 2020",
            itemPhoto: '../assets/skiis.jpg',
            itemDescription: "These skis are designed for women and are in great condition. Perfect for a day on the slopes.",
            condition: "great"
            },
            {
            id: 2,
            itemName: "Ski Poles",
            startDate: "May 16, 2020",
            returnDate: "May 30, 2020",
            itemPhoto: "../assets/skiipoles.png",
            itemDescription: "These ski poles are in good condition and are perfect for supporting you on the slopes.",
            condition: "good"
            },
            {
            id: 3,
            itemName: "Sled",
            startDate: "May 15, 2020",
            returnDate: "May 17, 2020",
            itemPhoto: "../assets/sled3.jpg",
            itemDescription: "This sled is in good condition and is perfect for a fun day of sledding.",
            condition: "good"
            },
            {
            id: 4,
            itemName: "Gloves",
            startDate: "April 21, 2021",
            returnDate: "June 10, 2021",
            itemPhoto: "../assets/sled3.jpg",
            itemDescription: "These gloves are in poor condition and may not provide the necessary warmth and protection for your hands on the slopes.",
            condition: "poor"
            },
            {
            id: 5,
            itemName: "Snow Shoes",
            startDate: "June 1, 2023",
            returnDate: "June 15, 2023",
            itemPhoto: "../assets/sled3.jpg",
            itemDescription: " These snow shoes are in good condition and are perfect for hiking and exploring in snowy conditions.",
            condition: "good"
            },
            {
            id: 5,
            itemName: "Skis - Men",
            startDate: "June 1, 2023",
            returnDate: "June 15, 2023",
            itemPhoto: "../assets/sled3.jpg",
            itemDescription: "These skis are designed for men and are in great condition. Perfect for a day on the slopes.",
            condition: "great"
            },
            {
            id: 6,
            itemName: "Gloves - Child",
            startDate: "June 1, 2023",
            returnDate: "June 15, 2023",
            itemPhoto: "../assets/sled3.jpg",
            itemDescription: "These gloves are designed to fit small children and will keep them warm on the moutain. Near perfect condition.",
            condition: "great"
            },
        ],
        this.selectedReservation = null
    },
    computed: {
        futureReservations() {
            // Create a new array with only the reservations that have a future return date
            return this.reservations.filter(reservation => {
                // Use JavaScript's Date object to compare the return date to the current date
                const returnDate = new Date(reservation.returnDate);
                const currentDate = new Date();

                // If the return date is in the future, add the reservation to the new array
                return returnDate > currentDate;
            });
        },
        pastReservations() {
            // Create a new array with only the reservations that have a future return date
            return this.reservations.filter(reservation => {
                // Use JavaScript's Date object to compare the return date to the current date
                const returnDate = new Date(reservation.returnDate);
                const currentDate = new Date();

                // If the return date is in the future, add the reservation to the new array
                return returnDate < currentDate;
            });
        }
    },
    methods: {
        isstartDateInFuture(reservation) {
            const startDate = new Date(reservation.startDate);
            const currentDate = new Date();
            return startDate > currentDate;
        }
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
    background-color: #ffffff;
}
th, td {
    border: 1px solid #ffffff;
    padding: 0.5em;
}

.heroimage {
    display: flex;
    width:100vw;
    height: calc(100vh - 56px);
    background: url("../assets/hero.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    background-attachment: fixed;
}
.bold {
  font-weight: bold;
}

.styled-table {
    min-width: 700px;
}

.styled-table thead tr {
    background-color: #abd4ab;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #dfdfdf;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>