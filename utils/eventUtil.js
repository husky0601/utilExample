// 跨浏览器的事件处理
var EventUtil = {
    
        // 视情况分别使用DOM0级方法、DOM2级方法或IE方法来添加事件
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false) 
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler) 
            } else {
                element['on' + type] = handler 
            }
        },
    
        // 返回对event对象的引用
        getEvent: function(event) {
            return event ? event : window.event 
        },
    
        // 获取事件源
        getTarget: function(event) {
            return event.target || event.srcElement
        },
    
        // 获取相关元素信息, 这个属性只对与mouseover和mouseout事件才包含值
        getRelatedTarget: function(event) {
            if (event.relatedTarget) {
                return event.relatedTarget
            } else if (event.toElement) { 
                return event.toElement
            } else if (event.formElement) { 
                return event.formElement
            } else {
                return null 
            }
        },
    
        // 鼠标按钮
        getButton: function(event) {
            if (document.implementation.hasFeature('MouseEvents', '2.0')) {
                return event.button
            } else {
                switch(event.button) {
                    case 0: // 表示没有按下按钮
                    case 1: // 表示按下了主鼠标按钮
                    case 3: // 表示同时按下了主、次鼠标按钮
                    case 5: // 表示同时按下了主、中鼠标按钮
                    case 7: // 表示同时按下了三个鼠标按钮
                        return 0
                    case 2: // 表示按下了次鼠标按钮
                    case 6: // 表示同时按下了次、中鼠标按钮
                        return 2
                    case 4: //表示按下了中间的鼠标按钮
                        return 1
                }
            }
        },
    
        // 鼠标滚轮增量值方法
        getWheellDelta: function(event) {
            if (event.wheelDelta) {
                return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
            } else {
                return -event.detail * 40 // Firefox中的值与其他浏览器的wheelDelta属性值有所不同
            }
        },
    
        // 取消事件的默认行为
        preventDefault: function(event) {
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
        },
    
        // 移除事件
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false)
            } else if (element.datachEvent) {
                element.datachEvent('on' + type, handler)
            } else {
                element['on' + type] = null
            }
        },
    
        // 立即停止事件在DOM层次中的传播（取消进一步的事件捕获或冒泡）
        stopPropagation: function(event) {
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble = true 
            }
        }
    }