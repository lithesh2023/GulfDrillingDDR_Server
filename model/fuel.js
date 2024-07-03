const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Vehicle schema
const fuelConsumptionSchema = new Schema({
  type: { type: String, required: true, },
  date: { type: Date, default: Date.now, required: true },
  number:{type: String, required: true},
  fuelType: { type: String } , // e.g., Petrol, Diesel, etc.
  volume:{type:Number,required:true},
  location:{type: String, required: true, },
  unit:{type:String,required:true}
});

// Define the Fuel Filling schema
const fuelRecievedSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  fuelType: { type: String } , // e.g., Petrol, Diesel, etc.
  volume:{type:Number,required:true},
  location:{type: String, required: true, },
  unit:{type:String,required:true}
});

// Create models from the schemas
const FuelConsumption = mongoose.model('FuelConsumption', fuelConsumptionSchema);
const FuelRecieved = mongoose.model('FuelRecieved', fuelRecievedSchema);

// Export the models
module.exports = { FuelConsumption, FuelRecieved };
