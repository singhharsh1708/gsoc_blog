// ===== Render posts (from js/posts.js) =====
// Runs first so the cards exist before fade-in observers and blog filters
// query the DOM further down.
(function renderPosts() {
  const posts = (window.POSTS || []).slice().sort((a, b) => b.date.localeCompare(a.date));
  if (!posts.length) return;

  const fmtDate = (iso) => {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const cardHTML = (p) => `
    <a class="blog-card" href="blog/${p.slug}.html" data-cat="${p.category}">
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span class="blog-category">${p.categoryLabel}</span>
          <span>${fmtDate(p.date)}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
      </div>
      <div class="blog-card-footer">
        <span>${p.date}</span>
        <span>${p.readTime}</span>
      </div>
    </a>`;

  const latest = document.getElementById('latest-grid');
  if (latest) latest.innerHTML = posts.slice(0, 3).map(cardHTML).join('');

  const blog = document.getElementById('blog-grid');
  if (blog) blog.innerHTML = posts.map(cardHTML).join('');
})();

// ===== Theme =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const root        = document.documentElement;

const ICON_SUN  = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
const ICON_MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) themeIcon.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0d12' : '#fafbfc');
}

setTheme(localStorage.getItem('theme') || 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// ===== Mobile Nav =====
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav    = document.getElementById('mobile-nav');

if (mobileToggle && mobileNav) {
  const closeNav = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };
  mobileToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}

// ===== Scroll-in fades =====
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => fadeObs.observe(el));

// ===== Navbar shadow + active link =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 8);

  const y = window.scrollY + 120;
  let active = '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      active = sec.id;
    }
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active}`));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Contribution Tabs =====
document.querySelectorAll('.contrib-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.contrib-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.querySelectorAll('.contrib-panel').forEach(p => {
      p.style.display = p.dataset.panel === target ? 'grid' : 'none';
    });
  });
});

// ===== Blog Filters (scoped to the full blog grid, not the latest preview) =====
const blogFilters = document.querySelectorAll('.blog-filter');
const blogCards   = document.querySelectorAll('#blog-grid .blog-card');
blogFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    blogFilters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const cat = filter.dataset.cat;
    blogCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// ===== Activity Graph (deterministic; weighted to recent activity) =====
(function renderGraph() {
  const grid = document.getElementById('github-graph');
  if (!grid) return;
  // seeded pseudo-random so the pattern is stable across loads
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const WEEKS = 52, DAYS = 7;
  for (let w = 0; w < WEEKS; w++) {
    // ramp activity up in recent weeks
    const recency = w / WEEKS; // 0..1
    for (let d = 0; d < DAYS; d++) {
      const cell = document.createElement('div');
      cell.className = 'graph-cell';
      const r = rand() + recency * 0.4;
      if      (r > 1.10) cell.classList.add('l4');
      else if (r > 0.85) cell.classList.add('l3');
      else if (r > 0.60) cell.classList.add('l2');
      else if (r > 0.40) cell.classList.add('l1');
      grid.appendChild(cell);
    }
  }
})();

// ===== Copy code buttons (blog posts) =====
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.addEventListener('click', () => {
    const code = pre.querySelector('code')?.textContent || pre.textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied';
      setTimeout(() => btn.textContent = 'Copy', 1800);
    });
  });
  pre.appendChild(btn);
});

// ===== Hero typing effect =====
(function heroTyping() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const text = el.dataset.text || '';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    return;
  }
  el.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'caret';
  el.appendChild(caret);

  let i = 0;
  const tick = () => {
    if (i < text.length) {
      caret.insertAdjacentText('beforebegin', text.charAt(i));
      i++;
      setTimeout(tick, 38);
    }
  };
  setTimeout(tick, 350);
})();

// ===== Syntax highlighting on blog post pages =====
if (document.querySelector('pre code')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
  script.onload = () => {
    const juliaScript = document.createElement('script');
    juliaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/julia.min.js';
    juliaScript.onload = () => {
      document.querySelectorAll('pre code').forEach((block) => {
        if (!block.className) block.classList.add('language-julia');
        window.hljs && window.hljs.highlightElement(block);
      });
    };
    document.head.appendChild(juliaScript);
  };
  document.head.appendChild(script);
}
