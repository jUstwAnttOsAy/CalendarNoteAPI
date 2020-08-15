var express = require("express");
var router = express.Router();
router.post("", function (req, res, next) {
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
    console.log(
      `insert into Notes(NoteDate, words) values('${req.body.noteDate}', '${req.body.words}')`
    );

    request
      .query(
        `insert into Notes(NoteDate, words) values('${req.body.noteDate}', '${req.body.words}')`
        //`insert into Notes(NoteDate, words) values('2020/08/15', 'asdsadsadsa')`
      )
      .then((result) => {
        res.send(result.rowsAffected);
      });
  });
});

module.exports = router;
