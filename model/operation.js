const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const operationSchema = new Schema({
    "StartDate": {
        type: Date,
        default: Date.now
      },
    "Plan_HRS": {
        type: Number,
        required: true
    },
    
    "description": {
        type: String,
    },
    "createdBy": {
        type: String,
        required: true
    },
    "operation_code":{
        type: String,
        required: true
    },
    "day_number":{
        type:Number,
        reuired:true
    },
    //"createdBy":{ type: Schema.Types.ObjectId, ref: "User" ,required: true},
    "well":{ type: Schema.Types.ObjectId, ref: "Well" ,required: true},
});


module.exports = mongoose.model("Operation", operationSchema);