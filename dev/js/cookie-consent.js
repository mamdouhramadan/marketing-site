(function() {
  function init() {
    try {
      if (localStorage.getItem('cookie_consent')) return;
    } catch(e) { return; }

    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    banner.classList.remove('hidden');
    banner.style.display = 'flex';

    function dismiss(accepted) {
      try {
        localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined');
      } catch(e) {}
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(1rem)';
      setTimeout(function() {
        banner.style.display = 'none';
        banner.classList.add('hidden');
      }, 300);
    }

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    if (acceptBtn) acceptBtn.addEventListener('click', function() { dismiss(true); });
    if (declineBtn) declineBtn.addEventListener('click', function() { dismiss(false); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
