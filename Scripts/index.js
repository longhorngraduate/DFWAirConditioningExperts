//------------------------------ $(function () { ------------------------------
$(function () {

    //'use strict';


    // ---------- Flickity ----------
    //#carousel_services
    $('.carousel').flickity({
        // options
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
        autoPlay: 6000,
        pageDots: false,
        selectedAttraction: 0.08,
        friction: 0.8,
        accessibility: true,
        fullscreen: false
    });

    $('.carousel3').flickity({
        // options
        cellAlign: 'center',
        contain: false,
        wrapAround: false,
        autoPlay: 6000,
        pageDots: true,
        //selectedAttraction: 0.03,
        //friction: 0.8,
        accessibility: true,
        fullscreen: true,
        lazyLoad: 1
    });

    var $carousel = $('.carousel3').flickity({
        imagesLoaded: true,
        percentPosition: false,
    });

    var $imgs = $carousel.find('.carousel-cell3 img');
    // get transform property
    var docStyle = document.documentElement.style;
    var transformProp = typeof docStyle.transform == 'string' ?
        'transform' : 'WebkitTransform';
    // get Flickity instance
    var flkty = $carousel.data('flickity');

    $carousel.on('scroll.flickity', function () {
        flkty.slides.forEach(function (slide, i) {
            var img = $imgs[i];
            var x = (slide.target + flkty.x) * -1 / 3;
            img.style[transformProp] = 'translateX(' + x + 'px)';
        });
    });
    // ---------- end of Flickity ----------

});//------------------------------ end of $(function () { ------------------------------
