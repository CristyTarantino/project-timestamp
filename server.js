// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const {date_string} = req.params;
  const not_a_date = 'Invalid Date';
  let date = new Date(date_string);

  date = String(date) === not_a_date ? new Date(+date_string) : date;

  String(date) === not_a_date
    ? res.send({"error":"Invalid Date"})
    : res.send({"unix": date.getTime(), "utc" : date.toUTCString() });
});

app.get("/api/timestamp", (req, res) => {
  res.send({"unix": Date.now(), "utc" : Date() });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
