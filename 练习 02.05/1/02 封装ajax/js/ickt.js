var ickt = {
    get: function(url, data, callbBack, dataType = "json") {
        // 兼容处理
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (ActiveXObject('Microsoft.XMLHTTP')) {
            xhr = new ActiveXObject('microsoft.XMLHTTP')
        } else {
            throw new Error('请升级浏览器');
        };

        // 事件监听
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 数据类型
                var  res = dataType == 'string' ? xhr.responseText: JSON.parse(xhr.responseText);
                callbBack(res);
            };
        };

        // 建立连接
        var querystring = '';
        // 判断携带的数据类型
        if (typeof data == 'string') {
            querystring = data;
        } else {
            for (var i in data) {
                querystring += '&' + i + '=' + data[i];
            }
            querystring = querystring.slice(1);
        };

        xhr.open('get', url + '?' + querystring, true);
        xhr.send();
    },

    post: function(url, data, callbBack, dataType = "json") {
        // 兼容处理
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (ActiveXObject('Microsoft.XMLHTTP')) {
            xhr = new ActiveXObject('microsoft.XMLHTTP')
        } else {
            throw new Error('请升级浏览器');
        };

        // 事件监听
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 数据类型
                var  res = dataType == 'string' ? xhr.responseText: JSON.parse(xhr.responseText);
                callbBack(res);
            };
        };

        // 建立连接
        var querystring = '';
        // 判断携带的数据类型
        if (typeof data == 'string') {
            querystring = data;
        } else {
            for (var i in data) {
                querystring += '&' + i + '=' + data[i];
            }
            querystring = querystring.slice(1);
        };
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'appliction/x-www-form-urlencoded');
        xhr.send(querystring);
    }

}