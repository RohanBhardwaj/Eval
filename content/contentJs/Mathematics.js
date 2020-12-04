//back to top button 
$(window).load(function() {
    $('.top-btn').fadeOut();
});

$(window).scroll(function() {
    if ($(this).scrollTop() != 0) {
        $('.top-btn').fadeIn();
    } else {
        $('.top-btn').fadeOut();
    }
});

$('.top-btn').click(function() {
    $("html, body").animate({ scrollTop: 0 }, 900);
    return false;
});