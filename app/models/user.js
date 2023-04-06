const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      // trim: true,
      // lowercase: true,
      unique: true,
      // validate: {
      //   validator: function (v) {
      //     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      //   },
      //   message: "Please enter a valid email"
      // },
      // required: [true, "Email required"]
    },
    password: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    mobileNumber: Number,
    userType: {
      type: String,
      enum: ['user', 'admin', 'manager'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active'
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    }
  },
    { timestamps: true }
  )
);

module.exports = User;
