$(function () {

  getqueryTopCategoryData(function (data) {
    // 一级分类
    var first = '';
    for (var i = 0; i < data.length; i++) {
      first += '<li data-id=' + data[i].id + '>' + data[i].categoryName + '</li>';
    }
    $('.cate-left > ul').html(first);
    $('.cate-left > ul > li').eq(0).addClass('now');

    // 二级分类
    var categoryId = $('.cate-left > ul > li:first-child').attr('data-id');
    render(categoryId);

    // 二级分类 点击切换
    $('.cate-left').on('tap', 'li', function () {
      // 防止多次点击加载
      if($(this).hasClass('now')) return false;
      $(this).addClass('now').siblings().removeClass('now');
      render($(this).attr('data-id'));
    })
  })
})

function getqueryTopCategoryData(callback) {
  $.ajax({
    url: './../../server/queryTopCategory.php',
    type: 'get',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data)
    }
  })
}

function getquerySecondCategoryData(params, callback) {
  $.ajax({
    url: './../../server/querySecondCategory.php',
    type: 'get',
    data: params,
    dataType: 'json',
    success: function (data) {
      callback && callback(data)
    }
  })
}

// 二级分类渲染DOM方法
function render(categoryId) {
  console.log(categoryId)
  getquerySecondCategoryData({
    id: categoryId
  }, function (data) {
    console.log(data);
    if (data == null) {
      $('.cate-right > ul').html('暂无当前分类数据');
    } else {
      var ele = '';
      for (var i = 0; i < data.length; i++) {
        ele += '<li><a href="javascript:;"><img src=' + data[i].brandLogo + '><p>' + data[i].brandName + '</p></a></li>';
      }
      $('.cate-right > ul').html(ele);
    }
  })
}