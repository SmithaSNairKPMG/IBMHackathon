const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const UsersSchema = new Schema({
  name:String,
  email:String,
  empId:String,
  password:String,
  role:{
    type: String,
    default: 'Employee'
  }
})

//create model for todo
const Users = mongoose.model('users', UsersSchema);

var data = new Users({name:'Admin',email:'Admin@kpmg',empId:'000',password:'123',role:'Admin'});

Users.countDocuments({role: 'Admin'}).then(c => {
  if (c < 1){
data.save(function (err, d) {
    if (err) return console.error(err);
    console.log(" saved to  collection.");
  });
}
});

module.exports = Users;