var layer = layui.layer,
  form = layui.form;

// ----------------------------------------切换
// 去注册
$("#goto-register").on("click", function() {
  $("#login").hide();
  $("#register").show();
});
// 去登录
$("#goto-login").on("click", function() {
  $("#login").show();
  $("#register").hide();
});


// -------------------------------------------注册
// 对密码长度：非空 \S  要求6,12
form.verify({
  // 长度要求验证
  changdu: [/^\S{6,12}$/, "输入的密码不符合要求！"],


  // 密码和重新输入的值得一样,val 验证该项的值 
  same: function(val) {
    // val:重复密码
    // 密码：$("#password")
    if ($("#password").val() != val) {
      return "两次密码输入的不一值"
    }
  }
});

$("#register form").on("submit", function(e) {
  // 1.阻止默认
  e.preventDefault();


  // 验证：不可能在这写；


  // 2.收集数据
  var params = $(this).serialize();

  // 3.提交数据：去哪看？接口文档！
  $.ajax({
    url: "http://ajax.frontend.itheima.net/api/reguser",
    type: "post",
    data: params,
    success: function(res) {
      // 不管成功失败，都进行弹窗！
      layer.msg(res.message);

      // 业务：提醒注册成功；把登录盒子显示、注册盒子隐藏！
      if (res.status == 0) {

        $("#login").show();
        $("#register").hide();
      }
      // 不成功的时候
      else {
        // 用户名id
        $("#username").val("");
      }

    }
  })
});


// -------------------------------------------登录
$("#login form").on("submit", function(e) {
  // 1.阻止默认
  e.preventDefault();

  // 2.收集数据
  var params = $(this).serialize();

  // 3.提交数据：去哪看？接口文档！
  $.ajax({
    url: "http://ajax.frontend.itheima.net/api/login",
    type: "post",
    data: params,
    success: function(res) {
      layer.msg(res.message);
      // 登录成功：
      //          返回token值：一会很多接口都要用，在index.html；
      //          本地储存：跨页面使用
      //          res.status==0 后台的设计和 前面学习 状态码 没有关系！
      if (res.status == 0) {
        location.href = "../index.html";
        localStorage.setItem("token", res.token);
      }
    }
  })
});