const express = require('express');
const mongoose = require('mongoose');
//1. 连接mongo 并且使用interview这个集合
const DB_URL= 'mongodb://localhost:27017/interview';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
    console.log('mongo connect success')
});

// 类似于mysql的表 mongo里有文档、字段的概念

const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}));
// create 新增数据
// User.create({
//     user: 'Crystal',
//     age: 18
// }, function(err, doc) {
//     if(!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// });


// 新建app
// User.remove({age: 19}, function(err, doc) {
//     console.log('--->'+ JSON.stringify(doc));
// });
// User.update({'age': 19}, {'$set': {age: 26}}, function(err, doc) {
//     console.log('update--->' + JSON.stringify(doc));
// });

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
});

app.get('/data', (req, res) => {
    // 查找数据
    User.find({}, function(err, doc){
        return res.json(doc);
    });
    // User.findOne({age:19}, function(err, doc){
    //     return res.json(doc);
    // });
    // res.json({name: 'imooc app', type: 'IT'});
});

app.listen(9093, function() {
    console.log('Node app start at port 9093');
})