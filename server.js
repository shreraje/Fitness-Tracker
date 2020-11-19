require("dotenv").config();

//Import packages
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

//PORT Setup
const PORT = process.env.PORT || 3000;

//Assigning express() to app
const app = express();

//Middlewares setup
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Connecting to mongodb atlas & server
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Import api-routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

//Server setup after connecting to db
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});