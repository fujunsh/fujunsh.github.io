$(function () {
    /**
     * 根据屏幕宽度的变化决定轮播图片应该展示什么
     * @return {[type]} [description]
     */

    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        $("#main_ad > .carousel-inner > .item").each(function (i, item) {
            var $item = $(item);
            var imgSrc = $item.data(isSmallScreen ? "image-xs" : "image-lg");
            $item.css("backgroundImage", "url('" + imgSrc + "')");
            if (isSmallScreen) {
                $(item).html("<img src='" + imgSrc + "' alt=''>");
            } else {
                $(item).empty();
            }
        });
    }
    $(window).on("resize", resize).trigger("resize");
    $('[data-toggle="tooltip"]').tooltip();
    var $ul = $(".nav-tabs");
    var width = 20;
    $ul.children("li").each(function (index, element) {
        width += element.clientWidth;
    });
    if(width > $(window).width()) {
        $ul.css('width', width).parent().css('overflow-x', 'scroll');
    }
    var $newsTitle = $(".news-title");
    $(".news-icon a").on("click", function () {
        var title = $(this).data("title");
        $newsTitle.text(title);
    });
    var $lb = $(".carousel");
    var starX,endX;
    var offset = 50;
    $lb.on("touchstart", function (e) {
        starX = e.originalEvent.touches[0].clientX;
    });
    $lb.on("touchmove", function (e) {
        endX = e.originalEvent.touches[0].clientX;
    });
    $lb.on("touchend", function (e) {
        var distance = Math.abs(starX - endX);
        if(distance > offset) {
            $(this).carousel(starX > endX ? 'next' : 'prev');
        }
    });
});








