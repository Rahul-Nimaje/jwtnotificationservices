const user = require('../../models/user');

exports.func = async (params) => {
    console.log("confirmuser", params);
    try {


        let data = {};
        data.isVerified = true;
        let condition = {
            email: params.email
        }
        let confirmuser = await user.findOneAndUpdate(condition, data, {
            new: true
        })
        console.log("confirmuser", confirmuser)
        return confirmuser
    } catch (err) {
        return err
    }
}