const express = require('express');

// 新建app
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
});

app.get('/data', (req, res) => {
    res.json({name: 'imooc app', type: 'IT'});
})

app.listen(9093, function() {
    console.log('Node app start at port 9093');
})