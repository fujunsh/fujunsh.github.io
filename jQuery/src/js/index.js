$(function () {
  var $as = $('#nav a');
  var $items = $('#view').children('div');
  $as.click(function () {
    var index = $as.index(this);
    $items.eq(index).addClass('show').siblings().removeClass();
  })
})



$(function () {
  $('#view .tab img').eq(0).show().siblings('img').hide();
  $('#view .tab li').mouseenter(function () {
    var index = $(this).index();
    $('#view .tab img').eq(index).show().siblings('img').hide();
  })
})



$(function () {
  var $imgs = $('#slider1 .lb-imgs')
  var imgwid = $('#slider1 .lb-imgs img').width();
  var imglen = $('#slider1 .lb-imgs img').length - 1;
  var wraplen = imgwid * imglen;
  var liId = $('#slider1 .lb-id').children('li');
  var index = 0;
  liId.mouseenter(function () {
    $(this).addClass('current').siblings().removeClass('current');
    index = $(this).index();
    $imgs.stop().animate({
      left: (-imgwid * index)
    }, 500);
  })
  $('#slider1 .arrow-right').click(function () {
    if (index == imglen) {
      $imgs.css('left', '0');
      index = 0;
    }
    index++;
    $imgs.stop().animate({
      left: (-imgwid * index)
    }, 500);
    if (index == imglen) {
      liId.eq(0).addClass('current').siblings().removeClass('current')
    } else {
      liId.eq(index).addClass('current').siblings().removeClass('current')
    }
  })
  $('#slider1 .arrow-left').click(function () {
    if (index == 0) {
      $imgs.css('left', -wraplen + 'px');
      index = imglen;
    }
    index--;
    $imgs.stop().animate({
      left: (-imgwid * index)
    }, 500);
    liId.eq(index).addClass('current').siblings().removeClass('current')
  })
  var timer = setInterval(autoClick, 4000);
  function autoClick() {
    $('#slider1 .arrow-right').trigger('click')
  }
  $('#slider1').mouseenter(function () {
    clearInterval(timer);
  }).mouseleave(function () {
    timer = setInterval(autoClick, 4000);
  })
})



$(function () {
  var index = 0;
  var lis = $("#slider2 .lb-imgs > li");
  var idx = $('#slider2 .lb-id').children('li');
  $('#slider2 .arrow-right').click(function () {
    index++;
    if (index >= lis.length) {
      index = 0;
    }
    lis.eq(index).fadeIn().siblings().fadeOut();
    idx.eq(index).addClass('current').siblings().removeClass('current');
  });
  $('#slider2 .arrow-left').click(function () {
    index--;
    if (index < 0) {
      index = lis.length - 1;
    }
    lis.eq(index).fadeIn().siblings().fadeOut();
    idx.eq(index).addClass('current').siblings().removeClass('current');
  });
  idx.mouseenter(function () {
    index = $(this).index();
    lis.eq(index).fadeIn().siblings().fadeOut();
    $(this).addClass('current').siblings().removeClass('current');
  })
  var timer = setInterval(autoClick, 4000);
  function autoClick() {
    $('#slider2 .arrow-right').trigger('click')
  }
  $('#slider2').mouseenter(function () {
    clearInterval(timer);
  }).mouseleave(function () {
    timer = setInterval(autoClick, 4000);
  })
})



$(function () {
	var smallBox = $('.mg .mg-small');
	var bigBox = $('.mg .mg-big');
	var mask = $('.mg .mg-mask');
	var bigimg = $('.mg .mg-big img');
	smallBox.mouseenter(function(e){
		bigBox.show();
    mask.show();
	}).mouseleave(function () {
    bigBox.hide();
    mask.hide();
  })
	var x = 0, y = 0;
	smallBox.mousemove(function(e){
    var maskW =  mask.width()
    var maskH =  mask.height()
    var smallBoxW =  smallBox.width()
    var smallBoxH =  smallBox.height()
    var bigBoxW =  bigBox.width()
    var bigBoxH =  bigBox.height()
    var bigimgW =  bigimg.width()
    var bigimgH =  bigimg.height()
		x = e.clientX - $(this).offset().left - maskW / 2;
    y = e.clientY - $(this).offset().top - maskH / 2;

		if(x <= 0){
			x = 0;
		}
		else if(x >= smallBoxW - maskW){
			x = smallBoxW - maskW;
		}
		if(y <= 0){
			y = 0;
		}
		else if(y >= smallBoxH - maskH){
			y = smallBoxH - maskH;
		}
		mask.css('left', x + "px");
		mask.css('top', y + "px");

		var bigMaxX = bigimgW - bigBoxW;
		var bigMaxY = bigimgH - bigBoxH;
		var maskMaxX = smallBoxW - maskW;
		var maskMaxY = smallBoxH - maskH;
		bigimg.css('left', (-x * bigMaxX/maskMaxX) + "px");
		bigimg.css('top', (-y * bigMaxY/maskMaxY) + "px");
	})
})


