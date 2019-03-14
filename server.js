'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
// require and use "multer"...
var multer = require("multer");
var upload = multer({"dest":"uploads/"});

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse",upload.single("upfile"), (req,res,next)=>{
  res.json({"Name":req.file.originalname,"Type":req.file.mimetype,"Size":req.file.size+" bytes"});
});




app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
