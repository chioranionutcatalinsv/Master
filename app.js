const express = require("express");
const expressHb = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("master"));

//Database
const db = require("./config/db");
const pinsRoute = require("./pins");
const authRoute = require("./auth");
//test db
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(err));

//routes
app.use("/pins", pinsRoute);
app.use("/auth", authRoute);

//error handler
app.use(function (err, req, res, next) {
    res.json({
    ok: false,
    message: JSON.stringify(err),
  });
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, console.log(`Server is running on ${PORT}`));

module.exports = app;
