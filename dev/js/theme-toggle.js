(function() {
  function init() {
    var html = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    var mobileToggle = document.getElementById('mobile-menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    if (toggle) {
      toggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
      });
    }

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function() {
        var isOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileToggle.setAttribute('aria-label', isOpen ? (mobileToggle.getAttribute('data-close-label') || 'Close menu') : (mobileToggle.getAttribute('data-open-label') || 'Open menu'));
        var openIcon = mobileToggle.querySelector('.mobile-menu-icon-open');
        var closeIcon = mobileToggle.querySelector('.mobile-menu-icon-close');
        if (openIcon) openIcon.classList.toggle('hidden', isOpen);
        if (closeIcon) closeIcon.classList.toggle('hidden', !isOpen);
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
