var oTab = document.getElementById('table'),
tHead = oTab.tHead,
oThs = tHead.rows[0].cells,// 表格中独有的
tBody = oTab.tBodies[0],
oRows = tBody.rows,
data = null;

window.onload = function () {
init()
}

// 初始化函数
function init() {
ajax({
    type: 'get',
    url: '../json/tableDate.txt',
    async: false,
    success: function (res) {
        data = res
    }
})
bind()
changeColor()
for (var i = 0; i < oThs.length; i++) {
    var cur = oThs[i]
    cur.flag = -1 
    if (cur.className === 'cursor') {
        cur.index = i
        cur.onclick = function () {
            sort.call(this, this.index)
        }
    }
}
}

function bind() {
//创建一个文档碎片
var frg = document.createDocumentFragment();
for (var i = 0; i < data.length; i++) {
    var cur = data[i]
    var oTr = document.createElement('tr')
    for (var key in cur) {
        var oTd = document.createElement('td')
        if (key === 'sex') {
            oTd.innerHTML = cur[key] === 0 ? "男" : "女"
        } else {
            oTd.innerHTML = cur[key]
        }
        oTr.appendChild(oTd)
    }
    frg.appendChild(oTr)
}
tBody.appendChild(frg)
frg = null;
}

function changeColor() {
for (var i = 0; i < oRows.length; i++) {
    oRows[i].className = i % 2 === 1 ? 'bg' : null
}
}

function sort(n) {
var self = this
var arr = domUtil.convertToArray(oRows)
for (var k = 0; k < oThs.length; k++) {
    if (oThs[k] !== self) {
        oThs[k].flag = -1
    }
}
//给数组进行排序:按照每一行中的第二列中的内容由小到大进行排序
self.flag *= -1
arr.sort(function (a, b) {
    var curInner = a.cells[n].innerHTML,
        nextInner = b.cells[n].innerHTML,
        curInnerNum = parseFloat(a.cells[n].innerHTML),
        nextInnerNum = parseFloat(b.cells[n].innerHTML)
    if (isNaN(curInner) || isNaN(nextInner)) {
        return (curInner.localeCompare(nextInner)) * self.flag
    } else {
        return (curInnerNum - nextInnerNum) * self.flag
    }
})

var frg = document.createDocumentFragment()
for (var i = 0; i < arr.length; i++) {
    frg.appendChild(arr[i])
}
tBody.appendChild(frg)
frg = null
changeColor()
}









