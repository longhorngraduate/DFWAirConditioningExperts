//jQuery(document).ready(function($) {
$(function () {

	//'use strict';


	/************** Toggle *********************/
    // Cache selectors
    var lastId,
        topMenu = $(".menu-first"),
        topMenuHeight = 50,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          
          if($(this).hasClass('external')) {
            return;
          }
            
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    //Custom, Willie, WWWSSS - This is the place to change the banner slideshow.
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 500);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;
       
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href=#"+id+"]").parent().addClass("active");
       }                   
    });



    $(window).scroll(function(){
         $('.main-header').toggleClass('scrolled', $(this).scrollTop() > 1);
     });



    $('a[href="#top"]').click(function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });


    //Custom, Willie, WWWSSS - This is the place to change the banner slideshow.
    function loadimg(myThis) {
        var src = $(myThis).attr("data-srca");
        //$(this).css("width", $('#ACRepair_Installation_1').width);
        //$(this).css("height", $('#ACRepair_Installation_1').height);
        //$(this).css("width", $('body').width + "px !important");

        $(myThis).attr("src", src).removeAttr("data-src").removeClass("lazy");
        $(myThis).removeClass("flexslider-img");
    }

    $('.flexslider').flexslider({
        slideshow: true,
        animation: "fade",
        animationLoop: true,
        slideshowSpeed: 6000,  
        //animation: "fade",
        directionNav: false,
        //controlNav: false,//"thumbnails"
        start: function (slider) {
            
        },
        before: function (slider) {
            // lazy load
            $("img.lazy").slice(0, 1).each(function () {
                $(this).attr("src", $(this).attr("data-srca")).removeClass("lazy");
            });
        }
    });
    

    $('.toggle-menu').click(function(){
        $('.menu-first').toggleClass('show');
        // $('.menu-first').slideToggle();
    });

    $('.menu-first li a').click(function(){
      $('.menu-first').removeClass('show');
    });


    /************** LightBox *********************/
      $(function(){
        $('[data-rel="lightbox"]').lightbox();
      });


});
