document.addEventListener('DOMContentLoaded', function () {
  var i;
  var nav = document.querySelector('nav.index');
  var headers = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');

  var createNavHeader = function(id, type, text) {
    var link = document.createElement('a');
    link.textContent = text;
    link.setAttribute('href', '#' + id);

    var text = document.createElement(type);
    text.appendChild(link);
    return text;
  };
  var createHeaderLink = function(id, text) {
    var link = document.createElement('a');
    link.classList.add('anchor');
    link.textContent = text;
    link.setAttribute('href', '#' + id);
    return link;
  };

  var processHeader = function(header) {
    var id = header.id;
    var tag = header.tagName;
    var text = header.textContent;

    var navHeader = createNavHeader(id, tag, text);
    nav.appendChild(navHeader);

    var headerLink = createHeaderLink(id, text);
    header.removeChild(header.firstChild);
    header.appendChild(headerLink); 
  }

  for (i = 0; i < headers.length; i++) {
    processHeader(headers[i]);
  }
});
