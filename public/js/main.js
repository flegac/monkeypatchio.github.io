$(document).ready(function () {
  $('#services').find('.item-inner').matchHeight();
  $('#who').find('.item-inner').matchHeight();
  $('#team').find('.item-inner').matchHeight();
  $('#careers').find('.item-inner').matchHeight();
  $('#assets').find('.item-inner').matchHeight();
  $('#offers').find('.item-inner').matchHeight();

  $(window).on('scroll', function () {
    var headerShrink = $(window).scrollTop() > 80;
    $('#header').addClass('header-shrink', headerShrink);
  });
});
