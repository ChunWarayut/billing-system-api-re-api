const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
app.use('/api', require('./app/routers'))
// simple route
app.get("/", (req, res) => {
  res.json({ message: "OK" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// require("dotenv").config();

// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var PORT = process.env.HTTP_PORT || 8089;
// var fs = require('fs');
// var moment = require('moment');
// var morgan = require('morgan');
// var path = require('path');

// app.use(bodyParser.json());
// app.use(cors());

// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan("combined", { stream: accessLogStream }));

// app.use('*', function (req, res, next) {
//     var utcOffset = 420;
//     if (req.body.fromdate) {
//         utcOffset = moment(req.body.fromdate).utcOffset();
//     }
//     if (req.body.todate) {
//         utcOffset = moment(req.body.todate).utcOffset();
//     }
//     req.utcoffset = utcOffset;
//     req.timezone = utcOffset * 60 * 1000;
//     next();
// });

// // app.use('/version', function (req, res) {
// //     res.status(200).json({ version: 1 });
// // })

// // app.use('/health', (req, res) => {
// //     res.status(200).json({ status: "ok" });
// // })

// // require('./app/routes.js')(app);

// app.listen(PORT,() => {
//     console.log('Server is running on port ' + PORT);
// })