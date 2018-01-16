window.onload = function() {
  var container = document.getElementById("container"); //获取容器的所有节点
  var list = document.getElementById("list"); //获取图片
  var buttons = document.getElementById("buttons").getElementsByTagName("span"); //获取圆点标签
  var pre = document.getElementById("pre"); //获取上一张按钮
  var next = document.getElementById("next"); //获取下一张按钮
  var index = 1; //使圆点标签停留在第一个
  var animated = false; //判断是否正在运行动画
  var timer; //定时器
  //图片切换函数
  function animate(offset) {
    if (offset == 0) {
      return;
    }
    animated = true;
    var newLeft = parseInt(list.style.left) + offset; //点击事件之后图片的偏移量
    var time = 300; //位移总时间
    var interval = 10; //位移时间间隔
    var speed = offset / (time / interval); //每次位移量,可改变动画的流畅度和时间的长短
    var go = function() {
      // 判断是否位移的条件
      if (
        (speed < 0 && parseInt(list.style.left) > newLeft) ||
        (speed > 0 && parseInt(list.style.left) < newLeft)
      ) {
        list.style.left = parseInt(list.style.left) + speed + "px";
        setTimeout(go, interval);
      } else {
        list.style.left = newLeft + "px";
        if (newLeft > -600) {
          list.style.left = -3000 + "px";
        }
        if (newLeft < -3000) {
          list.style.left = -600 + "px";
        }
        animated = false;
      }
    };
    go();
  }
  // 显示圆点标签的函数
  function showButton() {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className == "on") {
        buttons[i].className = "";
        break;
      }
    }
    buttons[index - 1].className = "on";
  }
  // 自动切换功能函数
  function play() {
    timer = setTimeout(function() {
      next.onclick();
      play();
    }, 3000);
  }
  //清除自动切换图片
  function stop() {
    clearTimeout(timer);
  }
  // 上一张/下一张事件绑定
  next.onclick = function() {
    if (animated) {
      return;
    }
    if (index == 5) {
      index = 1;
    } else {
      index += 1;
    }
    showButton();
    animate(-600);
  };
  pre.onclick = function() {
    if (animated) {
      return;
    }
    if (index == 1) {
      index = 5;
    } else {
      index -= 1;
    }
    showButton();
    animate(600);
  };
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      if (animated) {
        return;
      }
      if (this.className == "on") {
        return;
      }
      var myIndex = this.getAttribute("index");
      var offset = -600 * (myIndex - index);
      animate(offset);
      index = myIndex;
      showButton();
    };
  }
  //添加鼠标移动事件
  container.onmouseover = stop;
  container.onmouseout = play;
  play();
};
