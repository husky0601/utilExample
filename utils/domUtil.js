var domUtil = (function () {
    //判断当前浏览是是否是IE8以下的浏览器,true为IE8以下浏览器
    var flag = /MSIE (6|7|8)/i.test(navigator.userAgent)

    // 将类数组转化为数组，类数组在IE8以下无法直接使用Array原型转化为数组
    function convertToArray(likeArr) {
        if (!flag) {
            return Array.prototype.slice.call(likeArr)
        } else {
            var arr = []
            for (var i = 0; i < likeArr.length; i++) {
                arr[i] = likeArr[i]
            }
            return arr
        }
    }

    // 获取某个容器中所有的元素子节点并筛选出指定标签名
    function childrenNode(curElem, tagName) {
        var arr = []
        if (flag) {
            var nodeList = curElem.childNode
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i]
                if (curNode.nodeType === 1) {
                    arr[arr.length] = curNode
                }
            }
        } else {
            arr = this.convertToArray(curElem.children)
        }
        if (typeof tagName === 'string') {
            for (var k = 0; k < arr.length; k++) {
                var curEleNode = arr[k]
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    arr.splice(k, 1)
                    k--
                }
            }
        }
        return arr
    }

    // 获取同级节点的上一个元素节点
    function prevNode(curElem) {
        console.log(curElem)
        if (!flag) {
            return curElem.previousElementSibling 
        }
        var pre = curElem.previousSibling 
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling
        }
        return pre
    }

    // 获取同级节点的下一个元素节点
    function nextNode(curElem) {
        if (!flag) {
            return curElem.nextElementSibling
        }
        var next = curElem.nextSibling
        while (next && next.nodeType !== 1) {
            next = nex.nextSibling
        }
        return next
    }

    // 获取所有的兄元素节点
    function prevNodeAll(curElem) {
        var arr = []
        var pre = this.prevNode(curElem)
        while (pre) {
            arr.unshift(pre) 
            pre = this.prevNode(pre) 
        }
        return arr
    }

    // 获取所有的弟元素节点
    function nextNodeAll(curElem) {
        var arr = []
        var next = this.nextNode(curElem)
        while (next) {
            arr.push(next)
            next = this.nextNode(next)
        }
        return arr
    }

    // 获取相邻的两个元素节点
    function sliblingNode(curElem) {
        var pre = this.prevNode(curElem)
        var next = this.nextNode(curElem)
        var arr = []
        pre ? arr.push(pre) : null
        next ? arr.push(next) : null
        return arr
    }

    // 获取所有的兄弟元素节点
    function sliblingNodeAll(curElem) {
        return this.prevNodeAll(curElem).concat(this.nextNodeAll(curElem))
    }

    // 获取当前元素节点的索引
    function indexNode(curElem) {
        return this.prevNodeAll(curElem).length
    }

    // 获取第一个元素子节点
    function firstChildNode(curElem) {
        var children = this.childrenNode(curElem)
        return children.length > 0 ? children[0] : null
    }

    // 获取最后一个元素子节点
    function lastChildNode(curElem) {
        var children = this.childrenNode(curElem)
        return children > 0 ? children[0] : null
    }

    // 向容器的末尾添加节点
    function append(newElem, container) {
        return container.appendChild(newElem)
    }

    //向容器的头部添加节点=>在已有元素的第一个元素前增加节点，向未有节点的容器直接增加节点
    function preppend(newElem, container) {
        var first = this.firstChildNode(container)
        if (first) {
            container.insertBefore(newElem, first)
            return
        }
        container.appendChild(newElem)
    }

    // 将新元素插入到指定元素之前
    function insertBefore(newElem, oldElem) {
        oldElem.parentNode.insertBefore(newElem, oldElem)
    }

    // 将新元素插入到指定元素之后
    function insertAfter(newElem, oldElem) {
        var next = this.nextNode(oldElem)
        if (next) {
            oldElem.parentNode.insertBefore(newElem, next)
            return
        }
        oldElem.parentNode.appendChild(newElem)
    }

    // 判断当前元素是否包含该样式类名
    function hasClass(curElem, className) {
        var reg = new RegExp('(^| +)' + className + '($| +)')
        return reg.test(curElem.className)
    }

    // 给元素添加样式类名
    function addClass(curElem, className) {
        var arr = className.split(/ +/g)
        for (var i = 0, len = arr.length; i < len; i++) {
            var curClass = arr[i]
            if (!this.hasClass(curElem, curClass)) {
                console.log(curClass)
                curElem.className += ' ' + curClass
            }
        }
    }

    // 将移除元素样式类名
    function removeClass(curElem, className) {
        console.log('true')
        var arr = className.split(/ +/g)
        for (var i = 0, len = arr.length; i < len; i++) {
            var curClass = arr[i]
            if (this.hasClass(curElem, curClass)) {
                var reg = new RegExp('(^| +)' + curClass + '($| +)', 'g')
                curElem.className = curElem.className.replace(reg, ' ')
            }
        }
    }
    return {
        convertToArray: convertToArray,
        childrenNode: childrenNode,
        prevNode: prevNode,
        nextNode: nextNode,
        prevNodeAll: prevNodeAll,
        nextNodeAll: nextNodeAll,
        sliblingNode: sliblingNode,
        indexNode: indexNode,
        firstChildNode: firstChildNode,
        lastChildNode: lastChildNode,
        append: append,
        preppend: preppend,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
    }
})()