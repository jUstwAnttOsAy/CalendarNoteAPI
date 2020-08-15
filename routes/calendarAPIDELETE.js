var express = require("express");
var router = express.Router();
var cors = require("cors");

router.delete("/:id", function (req, res, next) {
  var sql = require("mssql");

  //config for your database
  var config = {
    user: "calendarUser",
    password: "swdaxswdax",
    server: "localhost\\SQLEXPRESS", //這邊要注意一下!!
    database: "CalendarNote",
  };

  //connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    //create Request object
    var request = new sql.Request();
    console.log(`delete Notes where id='${req.params.id}'`);

    request.query(`delete Notes where id='${req.params.id}'`).then((result) => {
      res.send(result.rowsAffected);
    });
  });
});

module.exports = router;
