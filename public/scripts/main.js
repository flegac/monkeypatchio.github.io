document.addEventListener('DOMContentLoaded', function () {
  var i;
  var showElement = function (query) {
    return function () {
      var selector = '#' + this.id + ' + ' + query;
      // console.info('showElement', selector);
      document.querySelector(selector).scrollIntoView(true);
    }
  };

  // Auto Show Asset
  var assets = document.querySelectorAll('.careers .assets .list input[type=radio]');
  var showAssetElement = showElement('.asset');
  for (i = 0; i < assets.length; i++) {
    assets[i].addEventListener('change', showAssetElement);
  }

  // Auto Show Job
  var jobs = document.querySelectorAll('.job .jobs .list input[type=radio]');
  var showJobElement = showElement('.job');
  for (i = 0; i < jobs.length; i++) {
    jobs[i].addEventListener('change', showJobElement);
  }
});
