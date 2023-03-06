const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    availability: { type: String, required: true },
    condition: { type: String, required: true },
    image: { type: String },
    comments : { type : Array , default : [] },
    isCheckedOut: {type: Boolean, default: false},
  },
  {
    collection: 'items',
  },
)


module.exports = mongoose.model('Items', itemSchema)