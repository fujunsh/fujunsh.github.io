$(function () {
  // 下拉刷新 上拉加载
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",
      down: { // 下拉刷新
        height: 50,
        auto: true, // 自动加载一次
        contentdown: "下拉可以刷新",
        contentover: "释放立即刷新",
        contentrefresh: "正在刷新...",
        callback: function () {
          setTimeout(function () {
            getCartData(function (data) {
              console.log(data);
              $('.pro-cart').html(template('cartList', data));
            })
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
          }, 500);
        }
      },
      up: { // 上拉加载
        height: 50,
        auto: false, // 自动加载一次
        contentrefresh: "正在刷新...",
        contentnomore: '没有更多数据了',
        callback: function () {
          setTimeout(function () {
            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
          }, 500);
        }
      }
    }
  });

  // 1. 首次加载初始化 自动执行一次下拉加载
  // 2. 刷新按钮     off() 清除绑定事件 防止多次绑定
  $('.fa-refresh').off('tap').on('tap', function () {
    mui('#refreshContainer').pullRefresh().pulldownLoading();
  });

  // 3. 编辑商品对话框功能
  $('.pro-cart').on('tap', '.mui-icon-compose', function () {
    var proId = $(this).parent().attr('data-id');
    var proItem = SC.getCartProductById(window.cartData.data, proId);
    var edit = template('edit_pro', proItem);
    var btnArray = ['是', '否'];
    // 去掉空格的换行
    mui.confirm(edit.replace(/\n/g, ''), '编辑商品', btnArray, function (e) {
      if (e.index == 0) {
        // 发送商品修改数据
        var size = $('.p-size span.now').html();
        var num = $('.p-number input').val();
        $.ajax({
          url: './../../../server/query-cart-updata.php',
          type: 'get',
          data: {
            size: size,
            num: num,
            id: proId
          },
          dataType: 'json',
          success: function (data) {
            if (data.succsee == true) {

            }
            // 修改数据，重新渲染页面
            proItem.size = size,
              proItem.num = num,
              $('.pro-cart').html(template('cartList', window.cartData));
          }
        })
      } else {
        // TODO
      }
    });
  });
  // 3.1 尺码选择
  $('body').on('tap', '.p-size span', function () {
    $(this).addClass('now').siblings().removeClass('now');
  });
  // 3.2 数量选择
  $('body').on('tap', '.p-number div span', function () {
    var $input = $('.p-number input');
    var currentNum = $input.val();
    var maxNum = parseInt($input.attr('data-max'));
    if ($(this).hasClass('countSub')) {
      if (currentNum <= 1) {
        mui.toast('至少需要一件商品');
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


  // 4. 点击删除当前商品
  $('.pro-cart').on('tap', '.mui-icon-trash', function () {
    var $that = $(this);
    var btnArray = ['是', '否'];
    mui.confirm('确认删除该商品？', '商品删除', btnArray, function (e) {
      if (e.index == 0) {

        // ajax 删除数据

        // 
        $that.parent().parent().remove();
        setAmount();
      } else {
        // TODO
      }
    });
  });



  // 5. 计算总金额
  $('.pro-cart').on('change', '[type=checkbox]', function () {
    setAmount();
  })
  



});
// ajax
function getCartData(callback) {
  $.ajax({
    url: './../../../server/query-cart-pages.php',
    type: 'get',
    data: '',
    dataType: 'json',
    success: function (data) {
      window.cartData = data;
      callback && callback(data);
    }
  })
}

/**
 * 计算总金额
 * @param
 * @return 
 */
function setAmount() {
  var $checkBox = $('[type=checkbox]:checked');
  var amountSum = 0;
  $checkBox.each(function (i, item) {
    var price = $(item).siblings('div').find('.newprice').find('i').html();
    var num = $(item).siblings('div').find('.num').find('i').html();
    amountSum += price * num;
  });
  if(Math.floor(amountSum * 10) % 10) {
    amountSum = Math.floor(amountSum * 100) / 100;
    amountSum = amountSum.toString() + '0';
  } else {
    amountSum = Math.floor(amountSum * 100) / 100;
  }
  if(amountSum == 0) {
    amountSum = 0;
  }
  $('.pro-sum div span').html(amountSum);
}