
// login
$(function () {
  $('.mui-icon-eye').on('tap', function () {
    $(this).toggleClass('mui-active');
    if($(this).hasClass('mui-active')){
      $(this).siblings('input').attr('type', 'text');
    }else {
      $(this).siblings('input').attr('type', 'password');
    }
  });

  // 登陆按钮
  $('.pro-login button').on('tap', function () {
    // 1. 获取表单数据 配合 name 属性
    var data = $('form').serialize();  // 得到的是 string  key=value&k=v
    var dataObj = SC.serialize2object(data);
    console.log(dataObj);

    // 校验
    if(!dataObj.username) {
      mui.toast('请输入用户名');
      return false;
    }
    if(!dataObj.password) {
      mui.toast('请输入密码');
      return false;
    }

    $.ajax({
      url: './../../../server/login.php',
      type: 'post',
      data: dataObj,
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if(data.error == 400) {
          mui.toast(data.msg);
          return false;
        }
        if(data.success == 'true') {
          console.log(location.search)
          location.href = location.search.replace('?returnUrl=', '');
          SC.status = 1;
          console.log(SC.status)
        }

      }
    })
  });
})

// 后台验证
// var getLoginData = function (obj) {
//   if(obj.username != 'root') {
//     mui.toast('该用户不存在');
//     return false;
//   }
//   if(obj.password != 'root') {
//     mui.toast('密码错误');
//     return false;
//   }
//   return true;
// }
