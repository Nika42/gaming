import ScrollReveal from 'scrollreveal';

$(function () {

    // $('#slider').height(window.innerHeight);

    let sr = ScrollReveal({
        duration: 1000
    });
    sr.reveal('nav')
    sr.reveal('.slider-title');
    sr.reveal('.popular-games .switcher-container');
    sr.reveal('.card');
    sr.reveal('.news');
    sr.reveal('.ad');
    sr.reveal('.owl-carousel');
    sr.reveal('.section-3 .col-3');
    sr.reveal('.section-4 .container');



    function ellipsizeText(el) {
        if ($(el).text().length > 38) {
            $(el).text($(el).text().slice(0, -Number($(el).text().length-38)) + '...');
        } 
    }

    $('.card-t2 .card-title').each(function(i, v){
        ellipsizeText(v);
    });

    var $owl = $('.owl-carousel');

    $owl.owlCarousel({
        items: 1,
        loop: false,
        margin: 0,
        dots: true,
        lazyLoad: true
    });

});

function makeViewable(){
    $('.onLoading').remove();
    $('html, body').css({
        overflow: 'auto',
        height: 'auto'
    });
};

$(window).on("load", function () {
    // setViewable();
    setTimeout(function () {
        makeViewable();
    }, 2500);
});
