var http = require('http');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');

var user = [
    { username: 'zhangsan', pwd: '123' },
    { username: 'lisi', pwd: '456' }
];

var MIME = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/script',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
};


http.createServer(function (req, res) {
    var url_str = req.url;
    var method = req.method.toLowerCase();
    var url_obj = url.parse(url_str, true);
    var pathname = url_obj.pathname;

    // ajax get请求注册
    if (pathname == '/register' && method == 'get') {
        // 获取用户名
        var username = url_obj.query.username;
        // 判断是否存在
        var res1 = user.some(function (item) {
            return item.username == username;
        });
        // 响应数据内容
        var resinfo = res1 ? { error: 1, msg: '用户名存在' } : { error: 0, msg: '用户名可用' }
        // 响应头
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.end(JSON.stringify(resinfo));
        return;
    }

    // 登录  post
    if (pathname == '/login' && method == 'post') {
        var data = '';
        // 传输数据时触发， 可以多次触发
        req.on('data', function (chunk) {
            // 拼接数据 转为字符串
            data += chunk;
        });

        // 当所有数据接收完成触发
        req.on('end', function () {
            var info = qs.parse(data);
            var username = info.username;
            var pwd = info.pwd;
            console.log(info);
            // 检测是否匹配
            var res1 = user.some(function (item) {
                return item.username == username && item.pwd == pwd;
            });

            var resinfo = res1 ? { error: 0, msg: '登录成功' } : { error: 1, msg: '登录失败' };
            res.setHeader('content-type', 'text/html;charset-utf-8');
            res.end(JSON.stringify(resinfo));
        })
        return;
    }

    // MIME
    var ext = pathname.split('.').pop();

    // 服务器读取路径 
    var newpath = '.' + pathname;

    if (newpath === './favicon.ico') {
        res.end('');
        return;
    };

    // // 默认主页
    try {
        var stat = fs.statSync(newpath);
        if (!stat.isFile()) {
            newpath = path.join(newpath, 'index.html');
        };
    } catch (e) {
        res.end('文件不存在');
        return;
    }

    // 响应静态内容
    fs.readFile(newpath, function (result, content) {
        if (!content) {
            res.setHeader('content-type', 'text/plain;charset=utf-8');
            res.end('查找的文件不存在');
        } else {
            res.setHeader('content-type', MIME[ext] + ';charset=utf-8');
            res.end(content);
        }
    });

}).listen(3000, function () {
    console.log('服务器连接成功');
})