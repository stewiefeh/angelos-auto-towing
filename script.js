// Angelo's Auto & Towing — motion
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll reveals
  var targets = document.querySelectorAll('.lane, .plate, .rev, .sect-title, .sect-sub, .shop-copy p, .find-copy > *, .trust');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
    // fail-safe: nothing stays hidden even if the observer never fires
    setTimeout(function () {
      targets.forEach(function (t) { t.classList.add('seen'); });
    }, 1800);
  }

  // mobile call bar appears after the hero
  var bar = document.querySelector('.callbar');
  var hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        bar.classList.toggle('show', !e.isIntersecting);
      });
    }, { threshold: 0.08 });
    heroIO.observe(hero);
  }

  // pause the sign strip when off-screen
  var strip = document.querySelector('.signstrip-track');
  if (strip && 'IntersectionObserver' in window && !reduced) {
    var sIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        strip.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0.1 });
    sIO.observe(strip);
  }
})();
