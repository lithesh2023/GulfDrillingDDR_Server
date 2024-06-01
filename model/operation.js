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
    "Actual_HRS": {
        type: Number
    },
    "Diff_HRS": {
        type: String,

    },
    "description": {
        type: String,
    },
    "createdBy": {
        type: String,
        required: true
    },
    //"createdBy":{ type: Schema.Types.ObjectId, ref: "User" ,required: true},
    "well":{ type: Schema.Types.ObjectId, ref: "Well" ,required: true},
});


module.exports = mongoose.model("Operation", operationSchema);