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

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // // Delete a user by id
  // app.delete("/api/users/:id", function(req, res) {
  //   db.Users.destroy({ where: { id: req.params.id } }).then(function(
  //     dbUsers
  //   ) {
  //     res.json(dbUsers);
  //   });
  // });
};
