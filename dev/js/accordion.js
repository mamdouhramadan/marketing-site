(function() {
  function init() {
    document.body.addEventListener('click', function(e) {
      var btn = e.target.closest('.accordion-btn');
      if (!btn) return;

      var item = btn.closest('.accordion-item');
      var panel = item ? item.querySelector('.accordion-panel') : null;
      var iconPlus = btn.querySelector('.accordion-icon-plus');
      var iconClose = btn.querySelector('.accordion-icon-close');
      if (!item || !panel) return;

      var container = btn.closest('[id]');
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (container) {
        container.querySelectorAll('.accordion-item').forEach(function(other) {
          if (other === item) return;
          var otherBtn = other.querySelector('.accordion-btn');
          var otherPanel = other.querySelector('.accordion-panel');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherPanel) {
            otherPanel.classList.add('max-h-0', 'opacity-0');
            otherPanel.classList.remove('max-h-96', 'opacity-100');
          }
          var op = other.querySelector('.accordion-icon-plus');
          var cl = other.querySelector('.accordion-icon-close');
          if (op) op.classList.remove('hidden');
          if (cl) cl.classList.add('hidden');
        });
      }

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.add('max-h-0', 'opacity-0');
        panel.classList.remove('max-h-96', 'opacity-100');
        if (iconPlus) iconPlus.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.remove('max-h-0', 'opacity-0');
        panel.classList.add('max-h-96', 'opacity-100');
        if (iconPlus) iconPlus.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
