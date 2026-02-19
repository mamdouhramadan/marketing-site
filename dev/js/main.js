$(document).ready(function () {

  $(".scroll-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  window.onscroll = function () { scrollFunction() };
  function scrollFunction() {

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $(".scroll-top").fadeIn();
    } else {
      $(".scroll-top").fadeOut();
    }
  }

});

$(window).on('load', function () {

  registerSW()

})

async function registerSW() {
  // Skip service worker on localhost so dev always gets fresh CSS/JS (no caching)
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) await reg.unregister();
    }
    return;
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {
      scope: '.' // <--- THIS BIT IS REQUIRED
    }).then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}
