$(function () {
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true,
    scrollX: false,
    startX: 0,
    startY: 0,
    indicators: true,
    deceleration: 0.0006,
    bounce: true
  });
  // 获取 详细 数据
  getProductData(function (data) {
    var key = SC.getParamsByUrl().productId;
    var product = getProductDataById(key, data); // 筛选
    $('.mui-scroll').html(template('p-detail', product));
    // 初始化轮播图
    mui('.mui-slider').slider({
      interval: 4000
    });
    console.log(product);

    // 1. 尺码选择
    $('.p-size span').on('tap', function () {
      if($(this).hasClass('now')) {
        $(this).removeClass('now');
        return false;
      }
      $(this).addClass('now').siblings().removeClass('now');
    });

    // 2. 数量选择
    var $input = $('.p-number input');
    $('.p-number div span').on('tap', function () {
      var currentNum = $input.val();
      var maxNum = parseInt($input.attr('data-max'));
      if ($(this).hasClass('countSub')) {
        if (currentNum <= 0) {
          mui.toast('已经是最少了');
          return false;
        }
        currentNum--;
      } else if ($(this).hasClass('countAdd')) {
        if (currentNum >= maxNum) {
          // tap 击穿 延时处理
          mui.toast('库存不足');
          return false;
        }
        currentNum++;
      }
      $input.val(currentNum);
    });
    
    // 3. 加入购物车
    $('.pro-buy .addCart').on('tap', function () {
      var choose = $('.p-size span.now');
      if(!choose.length) {
        mui.toast('请选择尺码');
        return false;
      }
      var count = $input.val();
      if(count <= 0) {
        mui.toast('请选择商品个数');
        return false;
      }
      SC.loginAjax({
        url: './../../server/add-cart.php',
        type: 'get',
        data: {
          productId: key,
          num: count,
          size: choose.html(),
          status: SC.status // 登录状态
        },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          // 对话框提示
          var btnArray = ['是', '否'];
          mui.confirm('添加购物车成功，是否查看', '温馨提示', btnArray, function(e) {
            if (e.index == 0) {
              location.href = SC.cartUrl;
            } else {
              // TODO
            }
          })
        }
      });
    })
  })

});

// ajax
function getProductData(callback) {
  $.ajax({
    url: './../../server/query-productDetail.php',
    type: 'get',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data);
    }
  });
}

// 后台筛选符合项
function getProductDataById(id, data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i];
    }
  }
}