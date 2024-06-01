const mongoose = require('mongoose')
const Schema = mongoose.Schema

const operationKeySchema = new Schema({
    operation_name:{
        type:String,
    },
    value:{
        type:String,
    },
    description:{
        type:String
    },
    department:{
        type:String
    }
})

module.exports = mongoose.model("OperationKey",operationKeySchema)