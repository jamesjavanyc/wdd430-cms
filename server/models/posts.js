const mongoose = require('mongoose');

// 定义post类型规则
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    body:{
        type: String,
        required:true,
    },
    author:{
        type: String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("Post",postSchema)