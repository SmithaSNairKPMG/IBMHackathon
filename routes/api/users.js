const express = require ('express');
const router = express.Router();
const Users = require('../.././models/users');

router.post('/register', (req, res, next) => { console.log(req.body);
  console.log(Users)
    if(req.body.name && req.body.email && req.body.empId && req.body.password){
      Users.create(req.body)
      .then(data =>{
     
       return res.json(data)
      }
      )
      .catch(next)
      }
  else {
       return res.json({
          error: "The input field is empty"
        })
      }
});


router.post('/login', (req, res, next) => {
    Users.findOne({email: req.body.email, password: req.body.password})
   .then(data => { 
     if(!data){
      return   res.status(400).send({
        error: 'Invalid UserName/Password'
     })
   } 
   return res.json(data)})
   .catch(next)
})

module.exports = router;