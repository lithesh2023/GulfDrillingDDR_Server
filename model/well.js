const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wellSchema = new Schema({
    "well_number":{
        type:String,
        required:true
    },
    "rig_up_date": {
      type: Date,
      default: Date.now
    },
    "job_type": {
        type:String,
        required:true
    },
    "lti_days": {
        type:Number,
        required:true
    },
    "contractor": {
        type:String,
        required:true
    },
    "createdBy":{
        type:String,
        // required:true
    },
    "rig":{
        type:String,
        required:true
    }
    //"createdBy":{ type: Schema.Types.ObjectId, ref: "User" ,required: true},
});


module.exports=mongoose.model("Well", wellSchema);