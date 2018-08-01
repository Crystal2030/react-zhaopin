const mongoose = require('mongoose');
//1. 连接mongo 并且使用interview这个集合
const DB_URL= 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        // 头像
        'avatar': {type: String},
        // 个人简介或者职位简介
        'desc': {type: String},
        // 职位名称
        'title': {type: String},
        // 如果你是boss 还有两个字段
        'company': {type: String},
        'money': {type: String},
    },
    chat: {
        'chatid': {type: String, require: true}, // 每个聊天唯一的标识， 两个用户的id拼接的
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: String, require: true, default: false}, // 未读消息字段
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: new Date().getTime()}
    }
}

for(let m in models) {
    // 通过Schema来创建Model, 拥有了Model，我们也就拥有了操作数据库的能力
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    // 读取模块名
    getModel: function(name) {
        return mongoose.model(name);
    }
}