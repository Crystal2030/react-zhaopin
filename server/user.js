const express = require('express');
const utility= require('utility'); // 加密密码
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');

const _filter = {'pwd': 0, '__v': 0}; // 统一要隐藏的查询字段

Router.get('/info', function(req, res) {
    const {userid} = req.cookies;
    if(!userid){
        // 用户有没有
        return res.json({code: 1});
    }
    User.findOne({_id:userid},_filter, function (err, doc) {
        if(err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if(doc) {
            return res.json({code: 0, data: doc})
        }
    })
});

Router.get('/list', function(req, res) {
    // User.remove({}, function(e, d) {});
    User.find({}, function(err, doc) {
        return res.json(doc);
    })
});

Router.post('/register', function(req, res) {
    console.log('register post--->' + JSON.stringify(req.body))
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, function(err, doc) {
        if(doc) {
            return res.json({code: 1, msg: '用户名已存在'});
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type});
        // create并不能返回生成之后的id， 而save可以
        userModel.save(function(e, d) {
            if(e) {
                return res.json({code:1, msg: '后端出错了'});
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}});
        });
        /*User.create({user, pwd: md5Pwd(pwd), type}, function(e, d){
            if(e) {
                return res.json({code:1, msg: '后端出错了'});
            }
            return res.json({code: 0});
        })*/
    })
});

Router.post('/login', function(req, res) {
    const {user, pwd} = req.body;
    // findOne第二个参数pwd设置为0， 接口返回不显示pwd字段
    User.findOne({user, pwd:md5Pwd(pwd)},_filter, function(err, doc){
        if(!doc) {
            return res.json({code:1, msg: '用户名或者密码错误'});
        }
        res.cookie('userid', doc._id);
        return res.json({code:0, data: doc})
    })
});

function md5Pwd(pwd) {
    const salt = 'crystal_is_good_123';
    return utility.md5(utility.md5(pwd+salt));
}

module.exports = Router;