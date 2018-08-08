// var path = require("path");
var db = require("../models");
var express = require("express");
var router = express.Router();

// Load index page
router.get("/", function(req, res) {
  res.render("index");
});

// Load profile page and pass in a user by id
// Need to modify this to query to database for the info, and use a variable in the url for the username
// app.get("/profile/hank", function(req, res) {
//   res.render("profile-info", {
//     name: "Hank",
//     img: "https://hankzimmer7.github.io/assets/images/profile_picture.jpg",
//     license: "none",
//     numberOfJump: 0,
//     homeDropZone: "ATL",
//     bio: "I love the sky, but I can't jump"
//   });
// });

router.get("/profile/:id", function(req, res) {
  console.log("/profile/" + req.params.id);
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.render("profile-info", {
      name: dbUser.name,
      img: dbUser.img,
      license: dbUser.license,
      numberOfJump: dbUser.numberOfJump,
      homeDropZone: dbUser.homeDropZone,
      bio: dbUser.bio
    });
  });
});

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;
