var http = require('http');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');

var user = [
    {username: 'zhangsan', pwd: '123'},
    {username: 'lisi', pwd: '456'}
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


http.createServer(function(req, res) {
    var url_str = req.url;
    var method = req.method.toLowerCase();
    var url_obj = url.parse(url_str, true);
    var pathname = url_obj.pathname;

    // get请求 注册
    if (pathname == '/register' && method == 'get') {
        var username = url_obj.query.username;
        
        // 判断是否存在
        var res1= user.some(function(value) {
            return value.username == username;
        });

        // 设置响应信息
        res.setHeader('content-type', 'text/html;charset=utf-8');
        if (res1) {
            res.end('<p style="color:red">用户名已经存在</p>');
        } else {
            res.end('<p style="color:green">用户名可用</p>');
        };
        return
    };

    // MIME
    var ext = pathname.split('.').pop();

    // 服务器读取路径 
    var newpath = '.' + pathname;

    if (newpath === './favicon.ico') {
        res.end('');
        return;
    };
    
    // 默认主页
    var stat = fs.statSync(newpath);
    if (!stat.isFile()) {
        newpath = path.join(newpath, 'index.html');
    };

    // 响应静态内容
    fs.readFile(newpath, function(result, content) {
        if (!content) {
            res.setHeader('content-type', 'text/plain;charset=utf-8');
            res.end('查找的文件不存在');
        } else {
            res.setHeader('content-type', MIME[ext] + ';charset=utf-8');
            res.end(content);
        }
    });
    
}).listen(3000, function() {
    console.log('服务器连接成功');
})