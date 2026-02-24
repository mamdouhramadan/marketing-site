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

(function() {
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : s;
    return d.innerHTML;
  }

  function init() {
    var container = document.getElementById('blog-list');
    if (!container) return;

    var BLOGS = window.__BLOGS__ || [];
    var PER_PAGE = 6;
    var currentPage = 1;
    var prevBtn = document.getElementById('blog-prev');
    var nextBtn = document.getElementById('blog-next');
    var pagesEl = document.getElementById('blog-pages');
    var searchEl = document.getElementById('blog-search');
    var categoryEl = document.getElementById('blog-category');
    var sortEl = document.getElementById('blog-sort');
    var DETAIL_BASE = window.__BLOG_DETAIL_BASE__ || 'blog-detail.html';

    function getFilteredAndSorted() {
      var q = (searchEl && searchEl.value) ? searchEl.value.toLowerCase().trim() : '';
      var cat = (categoryEl && categoryEl.value) ? categoryEl.value : '';
      var sort = (sortEl && sortEl.value) ? sortEl.value : 'date-desc';
      var list = BLOGS.filter(function(b) {
        var matchSearch = !q || b.title.toLowerCase().indexOf(q) >= 0 || (b.excerpt && b.excerpt.toLowerCase().indexOf(q) >= 0);
        var matchCat = !cat || b.category === cat;
        return matchSearch && matchCat;
      });
      if (sort === 'date-desc') list.sort(function(a, b) { return b.date < a.date ? -1 : 1; });
      else if (sort === 'date-asc') list.sort(function(a, b) { return a.date < b.date ? -1 : 1; });
      else if (sort === 'title-asc') list.sort(function(a, b) { return a.title.localeCompare(b.title); });
      else if (sort === 'title-desc') list.sort(function(a, b) { return b.title.localeCompare(a.title); });
      return list;
    }

    function renderCards(list) {
      var start = (currentPage - 1) * PER_PAGE;
      var slice = list.slice(start, start + PER_PAGE);
      container.innerHTML = slice.map(function(blog) {
        return '<article class="blog-card bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition shadow-sm hover:shadow-md">' +
          '<a href="' + DETAIL_BASE + '?id=' + blog.id + '" class="block">' +
          '<img class="w-full aspect-[16/10] object-cover" src="' + (blog.image || '') + '" alt="' + esc(blog.title || '') + '" loading="lazy">' +
          '<div class="p-5">' +
          '<p class="text-sm text-primary font-medium">' + esc(blog.category || '') + '</p>' +
          '<h2 class="text-lg font-bold text-secondary dark:text-gray-100 mt-1 line-clamp-2">' + esc(blog.title || '') + '</h2>' +
          '<p class="text-sm text-gray-500 dark:text-gray-400 mt-2">' + esc(blog.date || '') + ' &middot; ' + esc(blog.author || '') + '</p>' +
          '<p class="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">' + esc(blog.excerpt || '') + '</p>' +
          '</div></a></article>';
      }).join('');
    }

    function renderPagination(total) {
      var totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
      if (prevBtn) prevBtn.disabled = currentPage <= 1;
      if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
      if (pagesEl) {
        var html = '';
        for (var i = 1; i <= totalPages; i++) {
          var active = i === currentPage;
          html += '<button type="button" class="blog-page-btn px-3 py-1.5 rounded ' + (active ? 'bg-primary text-white' : 'border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700') + '" data-page="' + i + '">' + i + '</button>';
        }
        pagesEl.innerHTML = html;
        pagesEl.querySelectorAll('.blog-page-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            currentPage = parseInt(btn.getAttribute('data-page'), 10);
            update();
          });
        });
      }
    }

    function update() {
      var list = getFilteredAndSorted();
      currentPage = Math.min(currentPage, Math.max(1, Math.ceil(list.length / PER_PAGE)) || 1);
      renderCards(list);
      renderPagination(list.length);
    }

    if (searchEl) searchEl.addEventListener('input', function() { currentPage = 1; update(); });
    if (categoryEl) categoryEl.addEventListener('change', function() { currentPage = 1; update(); });
    if (sortEl) sortEl.addEventListener('change', function() { currentPage = 1; update(); });
    if (prevBtn) prevBtn.addEventListener('click', function() { if (currentPage > 1) { currentPage--; update(); } });
    if (nextBtn) nextBtn.addEventListener('click', function() {
      var list = getFilteredAndSorted();
      var totalPages = Math.ceil(list.length / PER_PAGE);
      if (currentPage < totalPages) { currentPage++; update(); }
    });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function() {
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : s;
    return d.innerHTML;
  }

  function init() {
    var contentEl = document.getElementById('blog-content');
    if (!contentEl) return;

    var BLOGS = window.__BLOGS__ || [];
    var STRINGS = window.__BLOG_DETAIL_STRINGS__ || {};
    var BASE = window.__BLOG_DETAIL_BASE__ || 'blog-detail.html';
    var SITE = window.__BLOG_DETAIL_SITE__ || 'Trufla';
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'), 10);
    var current = BLOGS.find(function(b) { return b.id === id; }) || BLOGS[0];
    var currentIndex = BLOGS.indexOf(current);

    var related = BLOGS.filter(function(b) { return b.category === current.category && b.id !== current.id; }).slice(0, 4);
    var prevBlog = currentIndex > 0 ? BLOGS[currentIndex - 1] : null;
    var nextBlog = currentIndex >= 0 && currentIndex < BLOGS.length - 1 ? BLOGS[currentIndex + 1] : null;

    var imgEl = document.getElementById('blog-image');
    var titleEl = document.getElementById('blog-title');
    var dateEl = document.getElementById('blog-date');
    var authorEl = document.getElementById('blog-author');
    var catEl = document.getElementById('blog-category');
    if (imgEl) {
      imgEl.innerHTML = '';
      var im = document.createElement('img');
      im.src = current.image || '';
      im.alt = current.title || '';
      im.className = 'w-full h-full object-cover';
      imgEl.appendChild(im);
    }
    if (titleEl) titleEl.textContent = current.title || '';
    if (dateEl) dateEl.textContent = current.date || '';
    if (authorEl) authorEl.textContent = current.author || '';
    if (catEl) catEl.textContent = current.category || '';
    contentEl.innerHTML = current.content || '<p>' + (STRINGS.noContent || 'No content.') + '</p>';

    var t = document.querySelector('title');
    if (t) t.textContent = (current.title || 'Blog') + ' | ' + SITE;
    var bc = document.querySelector('[aria-current="page"]');
    if (bc) bc.textContent = current.title || 'Post';

    var commentsEl = document.getElementById('blog-comments');
    var comments = current.comments || [];
    if (commentsEl) {
      commentsEl.innerHTML = comments.length ? comments.map(function(c) {
        return '<div class="flex gap-3"><div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center"><span class="fa fa-user"></span></div><div><p class="font-medium text-secondary dark:text-gray-100">' + esc(c.author || '') + '</p><p class="text-sm text-gray-500 dark:text-gray-400">' + esc(c.date || '') + '</p><p class="text-gray-700 dark:text-gray-300 mt-1">' + esc(c.text || '') + '</p></div></div>';
      }).join('') : '<p class="text-gray-500 dark:text-gray-400">' + esc(STRINGS.noComments || 'No comments yet. Be the first to comment.') + '</p>';
    }
    var form = document.getElementById('comment-form');
    if (form) form.addEventListener('submit', function(e) { e.preventDefault(); alert(STRINGS.commentSubmitted || 'Comment submitted (demo).'); });

    var relatedEl = document.getElementById('blog-related');
    if (relatedEl) {
      relatedEl.innerHTML = related.length ? related.map(function(b) {
        return '<a href="' + BASE + '?id=' + b.id + '" class="block group"><div class="flex gap-3"><img src="' + (b.image || '') + '" alt="' + esc(b.title || '') + '" class="w-20 h-14 rounded object-cover flex-shrink-0" loading="lazy"/><div class="min-w-0"><p class="font-medium text-secondary dark:text-gray-100 line-clamp-2 group-hover:text-primary">' + esc(b.title || '') + '</p><p class="text-sm text-gray-500 dark:text-gray-400">' + esc(b.date || '') + '</p></div></div></a>';
      }).join('') : '<p class="text-gray-500 dark:text-gray-400">' + esc(STRINGS.noRelated || 'No related posts.') + '</p>';
    }

    var prevWrap = document.getElementById('blog-prev-wrap');
    var nextWrap = document.getElementById('blog-next-wrap');
    if (prevWrap) prevWrap.innerHTML = prevBlog ? '<a href="' + BASE + '?id=' + prevBlog.id + '" class="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary dark:hover:text-gray-300/80"><span class="fa fa-arrow-left"></span> ' + esc(prevBlog.title || (STRINGS.previous || 'Previous')) + '</a>' : '';
    if (nextWrap) nextWrap.innerHTML = nextBlog ? '<a href="' + BASE + '?id=' + nextBlog.id + '" class="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary dark:hover:text-gray-300/80">' + esc(nextBlog.title || (STRINGS.next || 'Next')) + ' <span class="fa fa-arrow-right"></span></a>' : '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
