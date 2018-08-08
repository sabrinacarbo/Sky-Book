// var path = require("path");
var db = require("../models");
var express = require("express");
var router = express.Router();

// Load index page
router.get("/", function (req, res) {
  db.DZ.findAll().then(function (DZs) {
    db.Boogie.findAll().then(function (boogies) {
      res.render("index", {
        DZs: DZs,
        boogies: boogies
      });
    });
  });
});

// Load posts page
router.get("/posts", function (req, res) {
  db.Post.findAll().then(function (allPosts) {
    res.render("posts", {
      allPosts: allPosts
    });
  });
});

router.get("/profile/:id", function (req, res) {
  console.log("/profile/" + req.params.id);
  db.DZ.findAll().then(function (DZs) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.render("profile-info", {
        name: dbUser.name,
        img: dbUser.img,
        license: dbUser.license,
        numberOfJump: dbUser.numberOfJump,
        homeDropZone: dbUser.homeDropZone,
        bio: dbUser.bio,
        DZs: DZs
      });
    });
  });
});

// Render 404 page for any unmatched routes
router.get("*", function (req, res) {
  res.render("404");
});

module.exports = router;