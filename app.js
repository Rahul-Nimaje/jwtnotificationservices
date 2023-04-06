const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors())
const { Department, user } = require('./app/models')

console.log("user...............", Department, user)
app.use(express.json());
console.log(require("dotenv").config())

console.log("envcheck........", process.env.EMAIL_ID)

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

console.log("db...............", db)
db.mongoose
  .connect(`${dbConfig.HOST}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");

  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

let admin = require("./app/routes/admin")
let login = require("./app/routes/login")
app.use("/admin", admin);
app.use("/login", login);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});


require("./app/routes/routes")
require("./app/routes/user")
require("./app/routes/verify")


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
