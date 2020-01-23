const fs = require("fs");

//The following is used twice in the POST call, so moved it here for better readability later.
function writeNewNoteToArray(newNote) {
  parsedData.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(parsedData), function (Error) {
    if (Error) {
      throw (Error)
    };
  });
};
//Globally declaring the variable that will contain the db.json data in the POST and DELETE calls.
let parsedData = [];

module.exports = function (app) {

  // GET Request handling
  app.get("/api/notes", function (req, res) {
    let data = fs.readFileSync('./db/db.json', function read(err, data) {
      if (err) {
        throw err;
      }
    });
    res.json(JSON.parse(data));
  });

  // POST Request handling
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    //Saving the db.json file data to the data variable, parsing that data after.
    let data = fs.readFileSync('./db/db.json', function read(err, data) {
      if (err) {
        throw err;
      }
    });
    parsedData = JSON.parse(data);

    // Giving the new note an id number determined by the existence of other notes, which will be used in the subsequent DELETE request. Then adds the new note to the array and re-writes the db.json file with the updated array.
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

  // DELETE Request handling
  app.delete("/api/notes/:id", function (req, res) {
    // Saves the id of the note to be deleted. 
    let delNoteId = parseInt(req.params.id);
    console.log(delNoteId);
    let data = fs.readFileSync('./db/db.json', function read(err, data) {
      if (err) {
        throw err;
      }
    });
    parsedData = JSON.parse(data);

    // Finding the note to be deleted in the parsed JSON objecgt array, and splicing it out. 
    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].id === delNoteId) {
        res.json(parsedData.splice(i, 1));
      }
    }
    // Re-writing the db.json file with the updated array.
    fs.writeFile("./db/db.json", JSON.stringify(parsedData), function (Error) {
      if (Error) {
        throw (Error)
      };

    });
  });
};