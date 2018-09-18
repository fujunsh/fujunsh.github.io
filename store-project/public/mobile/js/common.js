var SC = {};
var HT = {};

// 获取 url的 key 值
SC.getParamsByUrl = function () {
  var params = {};
  var search = location.search; // ?key=1
  if(search) {
    search = search.replace('?', '');
    var arr = search.split('&');
    arr.forEach(function (item, i) {
      var itemArr = item.split('=');
      params[itemArr[0]] = itemArr[1];
    });
  }
  console.log(params);
  return params;
}

// 表单serialize数据 str 转为 对象 json
SC.serialize2object = function (serializeStr) {
  var obj = {};
  if(serializeStr) {
    // key=value&k=v
    var arr = serializeStr.split('&');
    arr.forEach(function (item, i) {
      var itemArr = item.split('=');
      obj[itemArr[0]] = itemArr[1];
    })
  }
  return obj;
}

// 购物车-返回id相符的对象
SC.getCartProductById = function (dataArr, id) {
  var obj = null;
  dataArr.forEach(function (item, i) {
    if(item.id == id) {
      obj = item;
    }
  });
  return obj;
}

// 登录状态
SC.status = 1;

SC.loginUrl = './user/login.html'; // 登录地址
SC.cartUrl = './user/cart.html'; // 购物车地址
// SC.Url = './user/cart.html'; // 登录地址

// login拦截 需要登录的ajax 判断登录 
// params ======> {}
SC.loginAjax = function (params) {
  $.ajax({
    url: params.url || '#',
    type: params.type || 'get',
    data: params.data || '',
    dataType: params.dataType || 'json',
    success: function (data) {
      if(data.error == 400) {
        // 未登录 跳转到登录页面，登陆成功后按地址跳转回来
        // ./user/login.html ?returnUrl= http://127.0.0.1:6657/lt-master/public/m/product.html?productId=1
        location.href = SC.loginUrl + '?returnUrl=' + location.href;
        return false;
      }else {
        params.success && params.success(data);
      }
    },
    error: function () {
      mui.toast('服务器繁忙');
    }
  })
}



