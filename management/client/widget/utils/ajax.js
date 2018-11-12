/**
 * @file utils - ajax
 * @author yaoronghe
 */
module.exports = function (config) {
    return new Promise(function (finish, wrong) {
        let apiUrl = config.url || currentUrl + '/managementapi/v1/node/';
        config = Object.assign({
            type: 'GET',
            data: {},
            callbackname: '',
            charset: 'utf-8',
            dataType: '', // [jsonp]
        }, config);

        jsonToQuery = function (json) {
            let result = Object.keys(json).map(function (item) {
                return item + '=' + json[item];
            });
            return result.join('&');
        };
        let xhr = new XMLHttpRequest();
        if (config.type === 'GET') {
            console.log(apiUrl);
            var getUrl = jsonToQuery(config.data);
            if (getUrl !== '') {
                apiUrl += '?' + getUrl;
            }
            console.log(apiUrl);
        }

        xhr.open(config.type, apiUrl, true);
        // 必须设置这个头部，不然接受不到数据
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    let res = JSON.parse(xhr.responseText);
                    if (res.code === 0) {
                        finish(res.data);
                    } else {
                        wrong(res.msg);
                    }
                } catch (e) {
                    wrong(e);
                }
            }
        };
        xhr.onerror = function (e) {
            wrong(e);
        };
        if (config.type !== 'GET') {
            xhr.send(JSON.stringify(config.data));
        } else {
            xhr.send();
        }
    });
};
