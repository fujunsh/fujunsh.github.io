$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true,
        scrollX: false,
        startX: 0,
        startY: 0,
        indicators: true,
        deceleration:0.0006,
        bounce: true
    });

    mui('.mui-slider').slider({
        interval:4000
    });

});












