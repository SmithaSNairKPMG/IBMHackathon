const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const CheckInSchema = new Schema({
  empId:String,
  modifiedAt:{
    type: Date,
    default: Date.Now
  },
  checkInStatus:{
    type: Boolean,
    default: false
  }
})

//create model for todo
const CheckIns = mongoose.model('checkIns', CheckInSchema);

var data = new CheckIns();

CheckIns.countDocuments({}).then(c => {
  if (c < 1){
data.save(function (err, d) {
    if (err) return console.error(err);
    console.log(" saved to  collection.");
  });
}
});

module.exports = CheckIns;