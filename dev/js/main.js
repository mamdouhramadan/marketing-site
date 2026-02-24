document.addEventListener('DOMContentLoaded', function () {
  var scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function scrollFunction() {
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      scrollBtn.style.display = top > 20 ? 'flex' : 'none';
    }
    window.addEventListener('scroll', scrollFunction);
    scrollFunction();
  }
});

window.addEventListener('load', function () {
  registerSW();
});

async function registerSW() {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    if ('serviceWorker' in navigator) {
      var regs = await navigator.serviceWorker.getRegistrations();
      for (var i = 0; i < regs.length; i++) await regs[i].unregister();
    }
    return;
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '.' })
      .then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  }
}
