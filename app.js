const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors())

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});


require("./app/routes/routes")(app);
require("./app/routes/user")(app);
require("./app/routes/verify")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
