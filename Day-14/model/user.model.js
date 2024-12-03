
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter user name"]
        },
        email:{
            type:String,
            required: [true, "Please enter email"]
        },
        password:{
            type:String,
            required: [true, "Please enter password"]
        }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model("User", UserSchema);
module.exports = Users;