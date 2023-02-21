const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    availability: { type: String, required: true },
    condition: { type: String, required: true },
    image: { type: String },
  },
  {
    collection: 'items',
  },
)


module.exports = mongoose.model('Items', itemSchema)