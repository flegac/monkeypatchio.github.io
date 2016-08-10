document.addEventListener('DOMContentLoaded', function () {
  var i;
  var menuHeight = document.querySelector('.menu').offsetHeight;
  var showElement = function (query) {
    return function () {
      var element = query ? document.querySelector('#' + this.id + ' + ' + query) : this;
      var left = element.offsetLeft;
      var top = element.offsetTop;
      window.scrollTo(left, top - menuHeight);
    }
  };

  // Auto Show Asset
  var assets = document.querySelectorAll('.careers .assets .list input[type=radio]');
  var showAssetElement = showElement('.asset');
  for (i = 0; i < assets.length; i++) {
    assets[i].addEventListener('change', showAssetElement);
  }

  // Auto Show Job
  var jobs = document.querySelectorAll('.job .jobs .list .job a');
  var showJobElement = showElement();
  for (i = 0; i < jobs.length; i++) {
    jobs[i].addEventListener('click', function () {
      var that = this;
      setTimeout(function () {
        showJobElement.call(that);
        that.href = /.*#$/.test(that.href) ? '#' + that.parentNode.id : '#';
      }, 100);
    });
  }
});
