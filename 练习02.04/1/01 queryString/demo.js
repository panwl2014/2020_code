var qs = require('querystring');

var str = 'username=name&pwd=aaaa';
var str1 = 'a+aa=b+bb=c+cc';

var obj1 = qs.parse(str1, '=', '+');
var obj = qs.parse(str);

console.log(obj);
console.log(obj.username);
console.log(obj1);
console.log(obj1.a);

// 原生实现querystring的parse
var obj2 = {};
var arr = str1.split('=');
arr.forEach(function(value) {
    var arr1 = value.split('+');
    obj2[arr1[0]] = arr1[1]; 
});
console.log(obj2);