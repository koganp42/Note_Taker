const fs = require("fs");
// function dbDataRead(){ 
//     fs.readFile('../db/db.json', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     return(data);
//   })};

module.exports = function(app) {
  
    app.get("/api/notes", function(req, res) {
      let data = fs.readFileSync('../db/db.json', function read(err, data) {
        if (err) {
            throw err;
        }
      }); 
      res.json(JSON.parse(data));
    });
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  
    app.post("/api/notes", function(req, res) {
        let data = fs.readFileSync('../db/db.json', function read(err, data) {
            if (err) {
                throw err;
            }
          });
        let parsedData = JSON.parse(data);
        parsedData.push(req.body);
        let jsonData = JSON.stringify(parsedData);
        fs.writeFileSync("../db/db.json", jsonData, function(Error){
            if(Error){
                throw(Error)
            }
        });
        res.json(req.body)
    });
  
    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!
  
    // app.delete("/api/clear", function(req, res) {
    //   // Empty out the arrays of data
    //   tableData.length = 0;
    //   waitListData.length = 0;
  
    //   res.json({ ok: true });
    // });
  };
  