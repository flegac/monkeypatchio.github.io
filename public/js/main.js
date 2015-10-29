$(document).ready(function() {

    /* ======= Twitter Bootstrap hover dropdown ======= */   
    /* Ref: https://github.com/CWSpear/bootstrap-hover-dropdown */ 
    /* apply dropdownHover to all elements with the data-hover="dropdown" attribute */
    
    $('[data-hover="dropdown"]').dropdownHover();
    
    /* ======= jQuery Responsive equal heights plugin ======= */
    /* Ref: https://github.com/liabru/jquery-match-height */
    
     $('#who .item-inner').matchHeight();    
     $('#testimonials .item-inner .quote').matchHeight(); 
     $('#latest-blog .item-inner').matchHeight(); 
     $('#services .item-inner').matchHeight();
     $('#team .item-inner').matchHeight();
     $('#careers .item-inner').matchHeight();
     $('#offers .item-inner').matchHeight();
     
    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */
    
    $('input, textarea').placeholder();         
    
    /* ======= jQuery FitVids - Responsive Video ======= */
    /* Ref: https://github.com/davatron5000/FitVids.js/blob/master/README.md */    
    $(".video-container").fitVids();   
    
	
	/* ======= Fixed Header animation ======= */ 
        
    $(window).on('scroll', function() {
         
         if ($(window).scrollTop() > 80 ) {
             $('#header').addClass('header-shrink');
         }
         else {
             $('#header').removeClass('header-shrink');             
         }
    }); 

    /* I18N management */

    $.i18n.init({
        resGetPath: 'public/locales/__lng__/__ns__.json',
        ns: { namespaces: ['ns.special'], defaultNs: 'ns.special'},
        useLocalStorage: false,
        debug: false,
        useCookie: true,
        fallbackLng: 'en'
    }, function(t) {
        $('body').i18n();
    });

    $('#changeLocaleToEn').click(function() {
        $.i18n.setLng("en", function(t) {
          $.cookie('i18next', 'en');
          $('body').i18n();
        });
    });

    $('#changeLocaleToFr').click(function() {
        $.i18n.setLng("fr", function(t) {
          //$('#languageEn').removeClass("active");
          //$('#languageFr').addClass("active");
          $.cookie('i18next', 'fr');
          $('body').i18n();
        });
    });
});