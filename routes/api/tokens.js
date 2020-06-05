const express = require ('express');
const router = express.Router();
const Tokens = require('../.././models/tokens');
const axios = require('axios');
const Users = require('../../models/users');

router.post('/addorupdate', (req, res, next) => { 
  
    if(req.body.empId && req.body.tokenStatus){
        Tokens.findOneAndUpdate({empId: req.body.empId},{'tokenStatus' : req.body.tokenStatus
        ,'modifiedAt':Date.now()}, {
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


router.post('/checkqueue', (req, res, next) => { 
      let apiUrl = req.protocol + '://' + req.get('host');
      Tokens.findOneAndUpdate({'tokenStatus' : 'Accepted','modifiedAt':{'$lt':new Date(Date.now() - 15*60 * 1000)}}
      ,{'tokenStatus' : 'Cancelled'
        ,'modifiedAt':Date.now()}, {
          upsert: false // Make this update into an upsert
        })
      .then(data => { console.log(data)
        axios.post(apiUrl + '/api/tokens/updatequeue')
              .then(t => {
                 return res.json(t)}
              );
      })
      .catch(next)
})
 


router.post('/getTokensByStatus', (req, res, next) => { 
  if(req.body.tokenStatus){ 
      Tokens.find({'tokenStatus': {$in: ['Accepted', 'InQueue','CheckedIn']}})
      .then(data => { 
       
        let promises = data.map(x => {
         return Users.findOne({empId: x.empId})
                .then(y => { console.log(x)
                  let obj = ({ 'empId': x.empId, 'name' : y.name,'tokenStatus': x.tokenStatus,'time': x.modifiedAt});
                 return obj;
                })}) ;
        
        Promise.all(promises)
       .then(r => { console.log(r); res.json(r)});
      })
      .catch(next)
    }
else {
     return res.json({
        error: "The input field is emptyt"
      })
    }
});

router.post('/requesttoken', (req, res, next) => { console.log(req.body);
    if(req.body.empId){
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
          console.log(totalseats)
          console.log(tokenAccepted)   
          console.log(tokenInQueue)      
           if(occupied < totalseats){
               if((occupied + tokenAccepted + tokenInQueue) < totalseats){
                axios.post(apiUrl + '/api/tokens/addorupdate',{empId: req.body.empId,tokenStatus: 'Accepted'})
                .then((r) => res.json({status: true,result: r.data})
                );
               }
               else{
                return res.json({status:false})
              }
           }
            else{
              return res.json({status:false})
            }
           

          }).catch(err => console.log(err))
       
      }
  else {
       return res.json({
          error: "The input field is emptyt"
        })
      }
});


router.post('/updatequeue', (req, res, next) => { console.log(req.body);
  
  Tokens.findOneAndUpdate({'tokenStatus': 'InQueue'},{'tokenStatus' : 'Accepted'
  ,'modifiedAt':Date.now()},{ upsert: false,
    sort: { modifiedAt: 1 }
  })
  .then(data => res.json(data))
  .catch(next)
});

router.post('/swipein', (req, res, next) => { console.log(req.body);
  if(req.body.empId &&  req.body.tokenStatus){
    let apiUrl = req.protocol + '://' + req.get('host');
          axios.post(apiUrl + '/api/checkIns/addorupdate',{empId: req.body.empId,checkInStatus: req.body.checkInStatus})
          .then(c => {
            axios.post(apiUrl + '/api/tokens/addorupdate',{empId: req.body.empId,tokenStatus: req.body.tokenStatus})
            .then(r => {
              if(req.body.checkInStatus == false)
              axios.post(apiUrl + '/api/tokens/updatequeue')
              .then(t => {
                var d = { tokenStatus: !r.data? '' : r.data.tokenStatus, 
                checkInStatus: !c.data?'': c.data.checkInStatus};  return res.json(d)}
              );
              else{
              var d = { tokenStatus: !r.data? '' : r.data.tokenStatus, 
              checkInStatus: !c.data?'': c.data.checkInStatus};  return res.json(d)}
            })
          }) .catch(err => console.log(err))
     
    }
else {
     return res.json({
        error: "The input field is emptyt"
      })
    }
});

router.post('/getcountbystatus', (req, res, next) => { console.log("yuyu")
    if(req.body.tokenStatus){
    Tokens.count({tokenStatus: req.body.tokenStatus})
    .then(data => { console.log("i" + data)
     return   res.json(data)
    })
    .catch(() => {
        console.log('get count error');
        next()
    })
    }
    else {
        return res.json({
           error: "The input field is emptyt"
         })
       }
});

module.exports = router;