const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api/api');
const users = require('./routes/api/users');
const occupancy = require('./routes/api/occupancy');
const checkIns = require('./routes/api/checkIns');
const tokens = require('./routes/api/tokens');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();
const axios = require('axios');

const app = express();

const port = process.env.PORT || 8080;

//connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/occupancy', occupancy);
app.use('/api/checkIns', checkIns);
app.use('/api/tokens', tokens);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

function CheckQueue(){
  console.log('Worker process called at ' + Date.now());
  axios.post('http://localhost:3006/api/tokens/checkqueue')
  .then(x => console.log('Worker process ended at ' + Date.now()))
}

app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

cron.schedule('*/5 * * * *',() =>{
  console.log('test');
  CheckQueue();
  })