const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    crew:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    empNumber:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        required:true
    },
    unit:{
        type:String
    },
    POBDate:{
        type:Date
    }
})

module.exports = mongoose.model("Employee",employeeSchema)