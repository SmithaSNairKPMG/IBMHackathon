const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TokensSchema = new Schema({
  empId:String,
  modifiedAt:{
    type: Date,
    default: Date.Now
  },
  tokenStatus:{
    type: String
  }
})

//create model for todo
const Tokens = mongoose.model('tokens', TokensSchema);

var data = new Tokens();

Tokens.countDocuments({}).then(c => {
  if (c < 1){
data.save(function (err, d) {
    if (err) return console.error(err);
    console.log(" saved to  collection.");
  });
}
});
  

module.exports = Tokens;