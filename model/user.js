const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  activation_code:{
    type: String,
  },
  employee_number:{
    type:String,
  },
  designaton:{
    type:String
  },
  unit:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  well: [{ type: Schema.Types.ObjectId, ref: "Well" }],
})

module.exports = mongoose.model("User", userSchema)
