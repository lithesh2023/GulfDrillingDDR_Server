const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
  designation:{
    type:String
  },
  unit:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  roles:[{
    type:String
  }],
  well: [{ type: Schema.Types.ObjectId, ref: "Well" }],
  refreshToken: String
})

module.exports = mongoose.model("User", userSchema)
