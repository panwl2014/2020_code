var qs = require('querystring');
console.log(qs);
var str = 'name=aaa&pwd=bbb';
var str1 = 'name+aaa&pwd+bbb&c+ccc';
var res = qs.parse(str);
var res1 = qs.parse(str1, '&', '+');
// console.log(res);
// console.log(res.name);
// console.log(res1);

// 原生实现
var obj = {};
var arr = str.split('&');
arr.forEach(function(item) {
    arr1 = item.split('=');
    obj[arr1[0]] = arr1[1];
});
console.log(obj);
