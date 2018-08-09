var db = require("../models");

module.exports = function(app) {
  // Get all user info
  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [db.DZ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/login", function(req, res) {
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
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
