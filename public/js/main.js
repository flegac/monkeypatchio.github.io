$(document).ready(function() {
    // i18n
    var i18n = i18next
      .use(i18nextXHRBackend) // allow loading json with XHR
      .use(i18nextBrowserLanguageDetector) // auto detect lang
      .use(i18nextLocalStorageCache); // caching in localStorage

    var updateText = function() {
      /* Translate */
      $('body').localize();

      /* ======= Twitter Bootstrap hover dropdown ======= */
      /* Ref: https://github.com/CWSpear/bootstrap-hover-dropdown */
      /* apply dropdownHover to all elements with the data-hover="dropdown" attribute
      $('[data-hover="dropdown"]').dropdownHover();*/

      /* ======= jQuery Responsive equal heights plugin ======= */
      /* Ref: https://github.com/liabru/jquery-match-height */

       $('#services .item-inner').matchHeight();
       $('#who .item-inner').matchHeight();
       $('#team .item-inner').matchHeight();
       $('#careers .item-inner').matchHeight();
       $('#assets .item-inner').matchHeight();
       $('#offers .item-inner').matchHeight();
    };

    i18n.init({
      debug: true,
      backend: {
        loadPath: '/public/locales/{{lng}}/{{ns}}.json'
      },
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        lookupQuerystring: 'lng'
      },
      fallbackLng: 'en'
    }, function() {
      i18nextJquery.init(i18n, $);
      updateText();
    });

    $('#changeLocaleToEn').click(function() {
        i18next.changeLanguage('en', updateText);
    });

    $('#changeLocaleToFr').click(function() {
      i18next.changeLanguage('fr', updateText);
    });



    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */

    $('input, textarea').placeholder();

	/* ======= Fixed Header animation ======= */

    $(window).on('scroll', function() {

         if ($(window).scrollTop() > 80 ) {
             $('#header').addClass('header-shrink');
         }
         else {
             $('#header').removeClass('header-shrink');
         }
    });
});
