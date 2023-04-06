const user = require("../../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.func = async (params) => {
    console.log("params...........", params)
    let data = params
    condition = {};
    condition.email = data.email;
    condition.isverified = true
    // condition.password = data.password
    // bcrypt.hash(data.password, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    // console.log("hash........", hash)
    // });
    try {
        let alredyUser = user.findOne(condition)
        if (alredyUser) {
            console.log("alredyUser", alredyUser)
            return alredyUser, "User Successfully Login"
        } else {
            throw new Error("email or Password not match")
        }
    } catch (err) {
        throw err
    }
}