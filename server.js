const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server running. Use our API on port: ${process.env.PORT || 3001}`
  );
});

const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb);

connection
  .then(() => console.log("Database connection successful".green))
  .catch((error) => {
    console.error("Database connection failed".red, error.message.red);
    process.exit(1);
  });
