const mongoose = require("mongoose");

const Department = mongoose.model(
    "Department",
    new mongoose.Schema({
        departmentname: {
            type: String,
            unique: true,
        },
        status: {
            type: String,
            enum: ['Active', 'Deactive'],
            default: 'Active'
        },

    },
        { timestamps: true }
    )
);

module.exports = Department;
