const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const fs = require('fs');
const path = require('path');

// console.log("fs............", fs, "path...........", path.dirname)

const db = {};
db.mongoose = mongoose;
// db.user = require("./user");
// db.department = require("./department");
const modelsPath = path.resolve(__dirname,)
fs.readdirSync(modelsPath).forEach(file => {
    require(modelsPath + '/' + file);
})
console.log("models........", modelsPath)
db.model = modelsPath
module.exports = db;