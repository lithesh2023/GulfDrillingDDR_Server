const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubOperationSchema = new Schema({
    "StartTime": {
        type: Date,
        default: Date.now,
        required: true
    },
    "EndTime": {
        type: Date,
        default: Date.now,
        required: true
    },
    "DiffHours": {
        type: Number,

    },

    "Category": {
        type: String,
        required: true
    },
    "Type": {
        type: String,
        required: true
    },
    "SubOpCOde": {
        type: String,
        required: true
    },
    "Description": {
        type: String,
        required: true
    },
    "createdBy": {
        type: String,
        
    },
    //"createdBy":{ type: Schema.Types.ObjectId, ref: "User" ,required: true},
    "Operation": { type: Schema.Types.ObjectId, ref: "Operation", required: true },
});


module.exports = mongoose.model("SubOperation", SubOperationSchema);