/* Caseonix drawing-set: shared behaviour for every page.
   1. Theme cross-fade. Each page keeps its own toggle; any change to <html data-theme>
      adds .theme-fade for the length of the colour transition (drawing-set.css).
   2. Scroll edge. <html data-scrolled> while the page is scrolled, so the glass strip
      swaps its resting hairline for a soft fade where content meets the chrome. */
(function () {
  var html = document.documentElement;
  var fadeTimer = 0;
  if ('MutationObserver' in window) {
    new MutationObserver(function () {
      html.classList.add('theme-fade');
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(function () { html.classList.remove('theme-fade'); }, 450);
    }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });
  }
  var scrolled = null;
  function edge() {
    var s = (window.scrollY || html.scrollTop || 0) > 4;
    if (s === scrolled) return;
    scrolled = s;
    if (s) html.setAttribute('data-scrolled', ''); else html.removeAttribute('data-scrolled');
  }
  window.addEventListener('scroll', edge, { passive: true });
  edge();
})();
