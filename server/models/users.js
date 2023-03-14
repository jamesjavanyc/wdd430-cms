const mongoose = require('mongoose');

// 定义user类型规则
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique :true
    },
    password:{
        type: String,
    },

},{timestamps:true});

module.exports = mongoose.model("User",UserSchema)