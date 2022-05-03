const express = require("express");
const cors = require("cors");
const app = express();
//listen for requests from client IP
var corsOptions = {
  origin: "http://167.99.155.106:3000"
};
app.use(cors(corsOptions));
const db = require("./app/models");
db.sequelize.sync();
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// initial route for express to broadcast on
app.get("/", (req, res) => {
  res.json({ message: "Server successfully initialized." });
});
// routes defined in other files
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port for express to listen on, read out this port in the console
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
