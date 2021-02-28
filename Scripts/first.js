function doResizes() {
    var docWidth = $(document).width();

    if (424 <= docWidth && docWidth < 491) {
        $('#companyname').addClass("fontsize1dot3");
        $('#companyname').text('DFW\xa0Air\xa0Conditioning\xa0Experts');
        
        $('#companyname').removeClass("fontsize1");
        $('#companyname').removeClass("fontsizedot98");
    }
    else if (353 <= docWidth && docWidth < 424) {
        $('#companyname').addClass("fontsizedot98");
        $('#companyname').text('DFW\xa0Air\xa0Conditioning\xa0Experts');
        
        $('#companyname').removeClass("fontsize1dot3");
        $('#companyname').removeClass("fontsize1");
    }
    else if (docWidth < 353) {
        $('#companyname').addClass("fontsize1");
        $('#companyname').text('DFW\xa0AC\xa0Experts');

        $('#companyname').removeClass("fontsize1dot3");
        $('#companyname').removeClass("fontsizedot98");
    }
    else {
        $('#companyname').text('DFW\xa0Air\xa0Conditioning\xa0Experts');

        $('#companyname').removeClass("fontsize1dot3");
        $('#companyname').removeClass("fontsize1");
        $('#companyname').removeClass("fontsizedot98");
    }
}


$(function () {
    // ---------- RESIZE Company Name ----------
    doResizes();

    $(window).resize(function () {
        doResizes();
    });
    // ---------- end of RESIZE Company Name ----------

    // ---------- OTHER 1 ----------
    $('body').bind('touchstart', function () { });
    // ---------- end of OTHER 1 ----------
});