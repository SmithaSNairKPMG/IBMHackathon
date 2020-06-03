const express = require ('express');
const router = express.Router();
const CheckIns = require('../.././models/checkIns');
const Tokens = require('../.././models/tokens');

router.post('/addorupdate', (req, res, next) => { console.log(req.body);
    if(req.body.empId){ console.log(req.body.checkInStatus)
        CheckIns.findOneAndUpdate({empId: req.body.empId},{'checkInStatus' : req.body.checkInStatus
        ,'modifiedAt':Date.now()},{
          new: true,
          upsert: true // Make this update into an upsert
        })
        .then(data => res.json(data))
        .catch(next)
      }
  else {
       return res.json({
          error: "The input field is emptyt"
        })
      }
});

router.post('/getstatus', (req, res, next) => { 
  if(req.body.empId){
      CheckIns.findOne({empId: req.body.empId})
      .then(data => { 
        Tokens.findOne({empId: req.body.empId})
        .then(r => {var d = {tokenStatus: !r? '' : r.tokenStatus, checkInStatus: !data?'': data.checkInStatus}; console.log(d); return res.json(d)})
      })
      .catch(next)
    }
else {
     return res.json({
        error: "The input field is emptyt"
      })
    }
});

router.get('/getcount', (req, res, next) => {
    CheckIns.count({checkInStatus: true})
    .then(data => { console.log("checkinsuccess" + data);
      return  res.json(data)
    })
    .catch(() =>{
        console.log("error");
        
    })
});

module.exports = router;