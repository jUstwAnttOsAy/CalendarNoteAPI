var express = require("express");
var router = express.Router();
router.get("/:year/:month/:date", function (req, res, next) {
  var sql = require("mssql");

  //config for your database
  var config = {
    user: "calendarUser",
    password: "swdaxswdax",
    server: "localhost\\SQLEXPRESS", //這邊要注意一下!!
    database: "CalendarNote",
  };

  //connect to your database
  /*sql.on("error", (err) => {
    // ... error handler
  });
  sql
    .connect(config)
    .then((pool) => {
      // Stored procedure

      return pool
        .request()
        .input(
          "selectedDate",
          sql.VarChar(10),
          (
            req.params.year * 10000 +
            req.params.month * 100 +
            req.params.date
          ).toString()
        )
        .execute("spCalendarNote_Select");
    })
    .then((result) => {
      res.send(result);
      //console.dir(result);
    })
    .catch((err) => {
      // ... error checks
    });
*/
  sql.connect(config, function (err) {
    if (err) console.log(err);

    //create Request object
    var request = new sql.Request();
    request.query(
      `select id,words from Notes where Year(NoteDate) = '${req.params.year}' and Month(NoteDate) = '${req.params.month}' and Day(NoteDate) = '${req.params.date}'`,
      function (err, recordset) {
        if (err) console.log(err);
        //send records as a response
        res.send(recordset.recordsets[0]);
      }
    );
  });
});

module.exports = router;
