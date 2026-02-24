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
