$(function () {
  // mui('.mui-scroll-wrapper').scroll({
  //   scrollY: true,
  //   scrollX: false,
  //   startX: 0,
  //   startY: 0,
  //   indicators: false,
  //   deceleration: 0.0006,
  //   bounce: true
  // });

  // 获取 上个页面的 key 值 返回数据
  var urlParams = SC.getParamsByUrl();
  $('input').val(urlParams.key || '');
  console.log(urlParams.key)
  // 跳转页面 ajax
  // getSearchData({
  //   proName: urlParams.key,
  //   page: 1,
  //   pageSize: 5
  // }, function (data) {
  //   // 后台筛选
  //   var seleObj = selectProdouct(urlParams.key, data);
  //   $('.pro-product').html(template('pro-product-item', seleObj));
  // });

  // 点击按钮 ajax 重新搜索
  $('.pro-search a').on('tap', function () {
    var key = $.trim($('input').val());
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }
    getSearchData({
      proName: key,
      page: 1,
      pageSize: 5
    }, function (data) {
      // 后台筛选
      var seleObj = selectProdouct(key, data);
      $('.pro-product').html(template('pro-product-item', seleObj));
      console.log(seleObj);
    });
  });

  // 分类筛选
  $('.pro-order a').on('tap', function () {
    var $this = $(this);
    if (!$this.hasClass('now')) {
      $this.addClass('now').siblings().removeClass('now').find('span')
        .removeClass('fa-angle-up').addClass('fa-angle-down');
    } else {
      if ($this.find('span').hasClass('fa-angle-down')) {
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
      } else {
        $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
      }
    }

    // 排序  1升序 2降序
    var order = $this.attr('data-order');
    var orderType = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
    var key = $.trim($('input').val());
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }
    getSearchData({
      proName: key,
      page: window.page,
      pageSize: 5
    }, function (data) {
      // console.log(data);
      var sortData = sortType(order, orderType, data);
      $('.pro-product').html(template('pro-product-item', sortData));
    });
  });

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
        callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据
          var key = $.trim($('input').val());
          if (!key) {
            mui.toast('请输入关键字');
            return false;
          }
          // 排序功能重置 
          $('.pro-order a').removeClass('now')
            .find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

          getSearchData({
            proName: key,
            page: 1,
            pageSize: 5
          }, function (data) {
            // 后台筛选
            var seleObj = selectProdouct(key, data);
            setTimeout(function () {
              $('.pro-product').html(template('pro-product-item', seleObj));
              // 结束下拉刷新
              mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
              // 重置上拉加载
              mui('#refreshContainer').pullRefresh().refresh(true);
            }, 500);
            console.log(seleObj);
          });
        }
      },
      up: { // 上拉加载
        height: 50,
        auto: false, // 自动加载一次
        contentrefresh: "正在刷新...",
        contentnomore: '没有更多数据了',
        callback: function () {
          var key = $.trim($('input').val());
          if (!key) {
            mui.toast('请输入关键字');
            return false;
          }
          // 页码自增 加载下一页
          window.page++;
          getSearchData({
            proName: key,
            page: window.page,
            pageSize: 5
          }, function (data) {
            if (data == null) {
              mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
              return false;
            }
            // 后台筛选
            var seleObj = selectProdouct(key, data);
            setTimeout(function () {
              $('.pro-product').append(template('pro-product-item', seleObj));
              // 结束下拉刷新
              mui('#refreshContainer').pullRefresh().endPullupToRefresh();
            }, 1000);
            console.log(seleObj);

            // 排序
            // var order = $('.pro-order a.now').attr('data-order');
            // var orderType = $('.pro-order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
            // getSearchData({
            //   proName: key,
            //   page: window.page,
            //   pageSize: 5
            // }, function (data) {
            //   // console.log(data);
            //   var sortData = sortType(order, orderType, data);
            //   $('.pro-product').html(template('pro-product-item', sortData));
            // });

          });
        }
      }
    }
  });



})
// ajax
function getSearchData(params, callback) {
  $.ajax({
    url: './../../server/query-product.php',
    type: 'get',
    data: params,
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data == null) {
        callback && callback(null);
        window.page = 3;
        return false;
      }
      window.page = data.page;
      callback && callback(data);
    }
  })
}

/**
 * 后台筛选功能
 * 
 * @param  urlKey obj
 * @return obj
 */
function selectProdouct(key, data) {
  var seleData = {};
  var seleArr = [];
  for (var i = 0; i < data.data.length; i++) {
    var item = data.data[i];
    if (item.proName.indexOf(key) != -1) {
      seleArr.push(item);
    }
  }
  // console.log(seleArr);
  seleData.data = seleArr;
  seleData.page = data.page;
  seleData.size = seleArr.length;
  seleData.count = seleArr.length;
  return seleData;
}

// 后台排序功能
function sortType(type, way, data) {
  var dataArr = data.data;
  var sortData = {};
  var arr = [];
  var sortArr = [];
  var len = dataArr.length;
  if (type == 'scale') {
    for (var i = 0; i < len; i++) {
      dataArr[i].type = parseFloat(dataArr[i].oldPrice) - parseFloat(dataArr[i].price);
      arr.push(dataArr[i].type);
      console.log(dataArr[i].type)
    }
    selectionSort(arr, way);
    for (var j = 0; j < len; j++) {
      var val = arr[j];
      for (var k = 0; k < len; k++) {
        if (val == dataArr[k].type) {
          sortArr.push(dataArr[k]);
        }
      }
    }
  } else {
    for (var i = 0; i < len; i++) {
      arr.push(dataArr[i][type]);
    }
    selectionSort(arr, way);
    console.log(arr)
    for (var j = 0; j < len; j++) {
      var val = arr[j];
      for (var k = 0; k < len; k++) {
        if (val == dataArr[k][type]) {
          sortArr.push(dataArr[k]);
        }
      }
    }
  }
  console.log(sortArr);
  sortData.data = sortArr;
  sortData.page = data.page;
  sortData.size = sortArr.length;
  sortData.count = sortArr.length;
  return sortData;
}
// 排序
function selectionSort(arr, way) {
  var len = arr.length;
  var minIndex, maxIndex, temp;
  if (way == 1) {
    for (var i = 0; i < len - 1; i++) {
      minIndex = i;
      for (var j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;
  } else if (way == 2) {
    for (var i = 0; i < len - 1; i++) {
      maxIndex = i;
      for (var j = i + 1; j < len; j++) {
        if (arr[j] > arr[maxIndex]) {
          maxIndex = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[maxIndex];
      arr[maxIndex] = temp;
    }
    return arr;
  }
}