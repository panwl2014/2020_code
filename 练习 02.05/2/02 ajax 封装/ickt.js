var ickt = {
    get: function(url, data, callBack, dataType = 'json') {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject('Microsoft.XMLHTTP')) {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } else {
            throw new Error('升级浏览器请');
        };

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = dataType == 'string' ? xhr.responseText: JSON.parse(xhr.responseText);
                callBack(res);
            }
        };

        // 携带的数据
        var querystring = '';
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


    post: function(url, data, callBack, dataType = 'json') {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject('Microsoft.XMLHTTP')) {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } else {
            throw new Error('升级浏览器请');
        };

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = dataType == 'string' ? xhr.responseText: JSON.parse(xhr.responseText);
                callBack(res);
            }
        };

        // 携带的数据
        var querystring = '';
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
    },

}