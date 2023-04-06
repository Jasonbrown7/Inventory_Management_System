const mongoose = require('mongoose')
const Schema = mongoose.Schema

let reservationSchema = new Schema(
  {
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    user: {type: String, required: true},
    item: {type: String, required: true},
    isOverdue: {type: Boolean, required: true, default: false },
  },
  {
    collection: 'reservations',
  },
)


module.exports = mongoose.model('Reservations', reservationSchema)