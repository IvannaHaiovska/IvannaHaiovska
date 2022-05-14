var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    'access-control-allow-credentials': true,
  });
  // update to match the domain you will make the request from
  next();
});

// default route
app.get('/', function (req, res) {
  return res.send({
    error: true,
    message: 'hello'
  })
});

var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  db: "tour",
  dialect: "mysql",
});

// connect to database
dbConn.connect();

app.get('/country', function (req, res) {
  dbConn.query('SELECT * FROM tour.country', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
});

app.get('/hotel', function (req, res) {
  dbConn.query('SELECT * FROM tour.hotel', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
});

app.get('/ticket', function (req, res) {
  dbConn.query('SELECT * FROM tour.book_ticket', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
});

app.post("/datehotel", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  dbConn.query(`SELECT * FROM tour.hotel WHERE ('${req.body.from}' BETWEEN available_dates_from AND  available_dates_to ) AND ( '${req.body.to}' BETWEEN available_dates_from AND available_dates_to)`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(results);
    });
});

app.post("/dateticket", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  dbConn.query(`SELECT * FROM tour.book_ticket WHERE (flight_dates_to BETWEEN '${req.body.from}' AND '${req.body.to}') OR (flight_dates_from BETWEEN '${req.body.from}' AND '${req.body.to}')`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(results);
      // console.log(results);
    });
});

app.get('/order', function (req, res) {
  res.status(200).send({
    message: "Замовлення отримане, очікуйте зв'язку з оператором."
  })
});

// set port
app.listen(3000, function () {
  console.log('Node app is running on port 3000');
});

module.exports = app;
