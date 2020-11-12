var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET home page. */
router.get('/', function (req, res, next) {

  connection.query('SELECT * FROM users', function (err, rows) {
    if (err) throw err;
    res.render('index', {
      users: rows
    });
  });

});

router.post('/addUser', function (req, res) {

  const userdata = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    profession: req.body.profession
  }
  connection.query("INSERT INTO users set ?", userdata, function (err, result) {
    if (err) throw err;
    res.redirect('/');
    console.log("Data Inserted!");
  });

});

router.get('/deleteUser/:id', function (req,res) {

  var userid = req.params.id;

  connection.query("DELETE FROM users WHERE id = ?",[userid],function (err, rows) {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;