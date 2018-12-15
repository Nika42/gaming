import ScrollReveal from 'scrollreveal';

$(function () {

    $('#slider').height(window.innerHeight);

    let sr = ScrollReveal({
        duration: 1000
    });
    sr.reveal('nav')
    sr.reveal('.slider-title');
    sr.reveal('.popular-games .switcher-container');
    sr.reveal('.card.card-t1');
    sr.reveal('.owl-carousel');
    sr.reveal('.post');



    function ellipsizeText(el) {
        if ($(el).text().length > 38) {
            $(el).text($(el).text().slice(0, -Number($(el).text().length-38)) + '...');
        } 
    }

    $('.card-t2 .card-title').each(function(i, v){
        ellipsizeText(v);
        
    });

    let owl = $(".owl-carousel").owlCarousel({
        items: 3,
        loop: true,
        margin: 16,
    });

    $('.switcher .fa-angle-left').click(function () {
        owl.trigger('prev.owl.carousel', [600]);
    })
    $('.switcher .fa-angle-right').click(function () {
        owl.trigger('next.owl.carousel', [600]);
    })
    
});