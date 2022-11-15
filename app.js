const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const claimsRouter = require('./src/routes/claims.route');
const userRouter = require('./src/routes/users.route');
const Claims = require('../DynamicPage/src/models/claims');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});



app.use('/claims', claimsRouter);

app.use('/user', userRouter);

app.post('/registerClaim', (req, res)=>{
  console.log(req.body);
  var userData =req.body

  var claimuser= new Claims(userData);
  claimuser.save((error, result)=>{
    if (error){
      console.log("No Data Sent ");
    }
    console.log("claimuser",claimuser);
    console.log("Sent Data");
    //res.sendStatus(200);
    res.json({details:claimuser})
  })
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});