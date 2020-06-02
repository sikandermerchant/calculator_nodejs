//Requiring express package in calculator.js
const express = require("express");
///Requirng body-parser package
const bodyParser = require('body-parser');

///Setup app using express module
const app = express();
app.use(bodyParser.urlencoded({extended:true}));// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings. More info on https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
const port = 3000;

///Spin-up server
app.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`);
  });

//CALCULATOR
///Define Home Route - route for calculator.html
app.get('/', (req,res)=>{
  res.sendFile(`${__dirname}/index.html`)///use res.sendFile as we are sending html build components on a file. More info on https://expressjs.com/en/4x/api.html#res.sendFile; 
  ///__dirname is the directory name of the current module. In this case it is index.html but it would also work globally if we install on a seperate server(physical) or cloud
  // console.log(__dirname);//this will o/p the directory on hyper which ends on \Calculator
});

//Handle post request - calculator
app.post('/',(req,res)=>{
  // console.log(req.body.num1); ///Thus by bodyParser.urlencoded we can access the form data. In this case it will return the value of num1 as a string though so we will have to convert them into numbers as follows
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2;
  res.send(`The sum is ${result}`);
});

//BMI CALCULATOR
///Define route for bmiCalculator.html and send response back
app.get('/bmiCalculator', (req,res)=>{
  res.sendFile(`${__dirname}/bmiCalculator.html`)
});

//Handle post request - bmiCalculator
app.post('/bmiCalculator', (req,res) =>{
// console.log(req.body);
const weight = parseFloat(req.body.weight);
const height = parseFloat(req.body.height);

const BMI = weight / (height * height);

res.send(`Your BMI is ${BMI}`);
});

