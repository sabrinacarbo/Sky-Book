var path = require("path");

module.exports = function(app) {
  // Get all user info
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
};
