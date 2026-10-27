// Picks French or English: ?lang=, then the saved choice, then the browser language.
(function () {
  var root = document.documentElement;
  var KEY = 'huedoku-lang';

  function saved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function apply(lang) {
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
  }

  var param = new URLSearchParams(location.search).get('lang');
  var browser = (navigator.language || 'en').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
  apply(param === 'fr' || param === 'en' ? param : saved() || browser);

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.lang');
    if (!button) return;
    button.addEventListener('click', function () {
      var next = root.lang === 'fr' ? 'en' : 'fr';
      apply(next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
    });
  });
})();
