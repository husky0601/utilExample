// 创建私有方法
~function () {
    function createXHR() {
        var xhr = null
        var versions = [
            function () {
                return new XMLHttpRequest
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            },
            function () {
                return new ActiveXObject("Msxm12.XMLHTTP")
            },
            function () {
                return new ActiveXObject("Msxm13.XMLHTTP")
            },
        ]
        var flag = false
        for (var i = 0; i < versions.length; i++) {
            var curFn = versions[i]
            try {
                xhr = curFn()
                createXHR = curFn
                flag = true
                break
            } catch (e) {
                return false
            }
        }
        if (!flag) {
            throw new Error('您的浏览器不支持ajax，请更换您的浏览器后重新试一次！')
        }
        return xhr
    }

    function ajax(options) {
        var _default = {
            url: '',      // 请求的地址
            type: 'get',  // 请求方式
            dataType: 'json', //  设置请求回来的内容格式 'json' or 'txt'
            async: true,  // 默认异步传递
            data: null,   // 放在请求主体中的内容（post）
            getHead: null,  // 当readyState=2时回调的方法
            success: null,  // 当readyState=4时回调的方法
        }
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key]
            }
        }
        if (_default.type === 'get') {
            _default.url.indexOf('?') >= 0 ? _default.url += '&' : _default.url += '?'
            _default.url += '_=' + Math.random()
        }

        var xhr = createXHR()
        xhr.open(_default.type, _default.url, _default.async)
        xhr.onreadystatechange = function () {
            if (/^2\d{2}$/.test(xhr.status)) {
                if (xhr.readyState === 2) {
                    if (typeof _default.getHead === 'function') {
                        _default.getHead.call(xhr)
                    }
                }
                if (xhr.readyState === 4) {
                    var val = xhr.responseText
                    if (_default.dataType === 'json') {
                        val = 'JSON' in window ? JSON.parse(val) : eval('(' + val + ')')
                    }
                    _default.success && _default.success.call(xhr, val)

                    // 为避免内存泄漏，清理文档
                    xhr = null
                }
            }
        }
        xhr.send(_default.data)
    }

    // 创建全局
    window.ajax = ajax;
} ();