const path = require("path");

module.exports = function(app) {
    // HTML GET Requests
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../notes.html"));
    });

    app.get("/assets/js/index.js", function(req, res) {
        res.sendFile(path.join(__dirname, "../assets/js/index.js"));
      });

    app.get("/assets/css/styles.css", function(req, res) {
        res.sendFile(path.join(__dirname, "../assets/css/styles.css"));
      });

    // If no matching route is found default to index
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../index.html"));
    });
  };