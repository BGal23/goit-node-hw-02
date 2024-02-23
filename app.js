const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb);

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// ---- TO JEST WYŁĄCZONE DO TESTÓW, W INNYM PRZYPADKU MOZNA ODKOMENTOWAĆ
// app.listen(process.env.PORT || 3001, () => {
//   console.log(
//     `Server running. Use our API on port: ${process.env.PORT || 3001}`
//   );
// });

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use(express.urlencoded());
app.use("/api/users", usersRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

connection
  .then(() => console.log("Database connection successful".green))
  .catch((error) => {
    console.error("Database connection failed".red, error.message.red);
    process.exit(1);
  });

module.exports = app;
