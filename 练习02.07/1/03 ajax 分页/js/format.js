function format(obj, tpl_str) {
    return tpl_str.replace(/<%(\w+(\.\w+)*)%>/g, function (match, $1) {
        // 将$1分隔成数组
        var arr = $1.split('.');
        // 备份对象
        var result = obj;
        // 遍历数组读取数据
        arr.forEach(function (item) {
            // 每一次都将result指向其内部的对象
            result = result[item];
        });
        // console.log(result);
        return result;
    });
}