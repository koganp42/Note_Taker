const fs = require("fs");

function writeNewNoteToArray(newNote) {
  parsedData.push(newNote);

  fs.writeFile("../db/db.json", JSON.stringify(parsedData), function (Error) {
    if (Error) {
      throw (Error)
    };
  });
};

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    let data = fs.readFileSync('../db/db.json', function read(err, data) {
      if (err) {
        throw err;
      }
    });
    res.json(JSON.parse(data));
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let parsedData = [];
    let data = fs.readFileSync('../db/db.json', function read(err, data) {
      if (err) {
        throw err;
      }
    });
    parsedData = JSON.parse(data);
    console.log(parsedData);
    if (parsedData.length === 0) {
      let id = 0;
      newNote.id = id + 1;
      writeNewNoteToArray(newNote);
      res.json(newNote);
    } else if (parsedData.length > 0) {
      let currentNotesLength = parsedData.length;
      newNote.id = parsedData[currentNotesLength - 1].id + 1;
      writeNewNoteToArray(newNote);
      res.json(newNote);
    }
  });

  app.delete("/api/notes/id:", function (req, res) {
    let delNoteId = parseInt(req.params.id);
    console.log(delNoteId);
    let data = fs.readFile('../db/db.json', function read(err, data) {
      if (err) {
        throw err;
      }
    });
    let parsedData = JSON.parse(data);
    console.log(parsedData);

    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].id === delNoteId) {
        res.json(parsedData.splice(i, 1));
      }
    }
    fs.writeFile("../db/db.json", JSON.stringify(parsedData), function (Error) {
      if (Error) {
        throw (Error)
      };

    });
  });
};