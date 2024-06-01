const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    "TxnDate": {
      type: Date,
      default: Date.now
    },
    "Description": String,
    "TxnAmount": Number,
    "Type": String,
    "sharedWith":[{ type: Schema.Types.ObjectId, ref: "User" }],
    "user":{ type: Schema.Types.ObjectId, ref: "User" ,required: true},
});


module.exports=mongoose.model("Expense", expenseSchema);
