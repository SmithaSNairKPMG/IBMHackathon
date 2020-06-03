const express = require ('express');
const router = express.Router();
const CheckIns = require('../.././models/checkIns');
const Tokens = require('../.././models/tokens');
const axios = require('axios');

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

router.get('/getavailableseats', (req, res, next) => {
  let apiUrl = req.protocol + '://' + req.get('host');

  let request = [
    axios.get(apiUrl + '/api/checkIns/getcount'), 
    axios.get(apiUrl + '/api/occupancy/totalseats'), 
    axios.post(apiUrl + '/api/tokens/getcountbystatus',{tokenStatus: 'Accepted'}), 
    axios.post(apiUrl + '/api/tokens/getcountbystatus',{tokenStatus: 'InQueue'})
  ];
 Promise.all(request).then(([req1, req2, req3, req4]) => { 
      const totalseats = req2.data[0].totalSeats;
      const occupied =  req1.data;
      const tokenAccepted = req3.data;
      const tokenInQueue = req4.data;
      console.log(occupied)
      console.log(tokenAccepted)
      console.log(tokenInQueue)
      const available = totalseats - (occupied + tokenAccepted + tokenInQueue);
      return res.json({available : available});
     
 });
});

module.exports = router;