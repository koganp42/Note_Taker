const path = require("path");

module.exports = function(app) {
    // HTML GET Requests
    app.get("/index", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
      });

    // If no matching route is found default to index
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  };