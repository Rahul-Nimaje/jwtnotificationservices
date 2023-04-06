const user = require('../../models/user');
const nodemailer = require("../../config/nodemailer");
// var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.func = async (params) => {
    try {
        console.log("params", params);
        let data = params;
        data.password = bcrypt.hashSync(params.password, 8)
        console.log("data", data.email);
        let condition = {
            email: data.email
        }
        const userdata = await user.findOne(condition)
        console.log("userdata", userdata, data.email)
        if (userdata) {
            // throw "User Alredy created"
            throw new Error(
                "User Alredy created"
            );
        }
        else {
            const userSave = await user.create(data)
            console.log("userSave", userSave)
            await nodemailer.sendConfirmationEmail(
                data.username,
                data.email,
            );
        }

    } catch (err) {
        return err

    }
    return "User Successfully Register"
}