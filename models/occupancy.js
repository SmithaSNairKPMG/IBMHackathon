const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const OccupancySchema = new Schema({
  totalSeats:{
    type: Number,
    default: 0
  }
})

//create model for todo
const Occupancy = mongoose.model('occupancy', OccupancySchema);

var data = new Occupancy({ totalSeats: 0 });

Occupancy.countDocuments({}).then(c => {
    if (c < 1){
data.save(function (err, d) {
    if (err) return console.error(err);
    console.log(" saved to  collection.");
  });
}
    });

module.exports = Occupancy;