const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongodb = require("./db/connect.js");
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

// Set up other middleware and configurations
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware to handle CORS headers

// Set up routes
app.use("/", require("./routes"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});
