const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keywordSchema = new Schema({
    key_name:{
        type:String,
        unique:true
    },
    values:{
        type:[{type:String}]
    },
    description:{
        type:String
    },
    department:{
        type:String
    }
})

module.exports = mongoose.model("Keyword",keywordSchema)