const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobileNumber: {
        type: String,
    },
    name:  {
        type: String,
    },
    email:{
        type: String,
        default: null
    },
    userId:{
        type: String,
        default: null
    }

});

module.exports = mongoose.model("users", userSchema);