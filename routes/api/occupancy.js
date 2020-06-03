const express = require ('express');
const router = express.Router();
const Occupancy = require('../.././models/occupancy');

router.post('/addorupdate', (req, res, next) => { console.log(req.body);
    if(req.body.totalSeats){
        Occupancy.update({},{'$set': {'totalSeats' : req.body.totalSeats}})
        .then(data => res.json(data))
        .catch(next)
      }
  else {
       return res.json({
          error: "The input field is emptyt"
        })
      }
});

router.get('/totalseats', (req, res, next) => {
    Occupancy.find({}, 'totalSeats')
    .then(data => { console.log(data)
    return  res.json(data)
    })
    .catch(() => console.log("e-o"))
});

module.exports = router;