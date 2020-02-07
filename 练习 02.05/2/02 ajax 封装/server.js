// 引入模块
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');

// MIME配置
var MIME = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/script',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
};

// 用户数据
var user = [
    { username: 'zhangsan', pwd: '123' },
    { username: 'lisi', pwd: '123' }
];

// 创建服务
http.createServer(function (req, res) {
    // 设置响应头
    // 获取路径及基本信息
    // 接口处理

    // 判断是否为文件夹设置默认主页
    // 拼接路径
    // 返回读取到的静态资源
    // 获取路径 及基本信息
    res.setHeader('content-type', 'text/html;charset=utf-8');

    var url_str = req.url;
    var url_obj = url.parse(url_str, true);
    var pathname = url_obj.pathname;
    var ext = pathname.split('.').pop();
    var method = req.method.toLowerCase();

    // get 验证用户名接口**************************************************
    if (pathname == '/register' && method == 'get') {
        // var username = url_obj.query.username;

        // var res1 = user.some(function (item) {
        //     return username == item.username
        // });
        // resinfo = res1 ? { error: 0, msg: '用户名不可用' } : { error: 1, msg: '用户名可用' };
        res.end(JSON.stringify(url_obj.query));
        return;
    };

    // post 验证***********************************************************
    if (pathname == '/login' && method == 'post') {
        var data = '';

        req.on('data', function (data1) {
            data += data1;
        });

        req.on('end', function () {
            // var info = qs.parse(data);
            // var username = info.username;
            // var pwd = info.pwd;

            // var res1 = user.some(function (item) {
            //     return username == info.user && pwd == info.pwd;
            // });

            // var resinfo = res1 ? { error: 0, msg: '登录成功' } : { error: 1, msg: '登录失败' };
            console.log(data);
            res.end(JSON.stringify(data));
        });
        return;
    };

    // 服务器读取路径
    var newpath = '.' + pathname;

    // 处理favicon  设置默认主页 
    if (newpath == './favicon.ico') {
        res.end('');
        return;
    };

    try {
        var stat = fs.statSync(newpath);
        if (!stat.isFile()) {
            newpath = path.join(newpath, 'index.html');
        }
    } catch (error) {
        res.end('请输入正确的地址');
        return;
    };

    // 响应静态内容
    fs.readFile(newpath, function (result, contnet) {
        console.log(newpath);
        if (!contnet) {
            res.end('查找的文件不存在');
        } else {
            res.setHeader('content-type', MIME[ext] + ';charset= utf-8');
            res.end(contnet);
        }
    });
    
}).listen(3000, function () {
    console.log('服务连接成功');
})