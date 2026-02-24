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
