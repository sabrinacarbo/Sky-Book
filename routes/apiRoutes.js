var db = require("../models");
var express = require("express");
var apiRouter = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});


var upload = multer({ storage: storage });
var imgBaseUrl = '../'

// Get all user info
apiRouter.get("/api/users", function(req, res) {
  db.User.findAll({
    include: [db.DZ]
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

apiRouter.post("/api/login", function(req, res) {
  console.log(req.body);
  db.User.findAll({
    include: [db.DZ]
  }).then(function(dbUser) {
    for (var i = 0; i < dbUser.length; i++) {
      if (dbUser[i].userName === req.body.userName) {
        if (dbUser[i].password === req.body.password) {
          var userId = dbUser[i].id;
        } else {
          userId = -1;
        }
      }
    }

    res.json(userId);
  });
});

// Create a new user
apiRouter.post("/api/users", (req, res, next) => {
  db.User.create({
    "username": req.body.userName,
    "password": req.body.password,
    "name": req.body.name,
    "license": req.body.license,
    "numberOfJump": req.body.numberOfJump,
    "homeDropZone": req.body.homeDropZone,
    "bio": req.body.bio
  }).then(function (dbUser) {
    res.json(dbUser);
    console.log(dbUser);
  });
});


//upload img to the server
apiRouter.post('/upload/img', upload.single('img'), function (req, res) {

  var files = req.file;
 
  
  var result = {};
  if(!files) {
    result.code = 1;
    result.errMsg = "Upload Failed";
  } else {
    result.code = 0;
    result.data = {
      url: files.path
    }
    result.errMsg = "Upload Success";
  }
  res.end(JSON.stringify(result));
});



module.exports = apiRouter;
