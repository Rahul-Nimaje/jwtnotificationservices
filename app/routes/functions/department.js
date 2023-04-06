const Department = require('../../models/department');
// const Department = models.model.department;
exports.func = async (params) => {
    console.log("func.......", params.status)
    let conditions = {
        status: params.status
    }
    return await Department.find(conditions);

}