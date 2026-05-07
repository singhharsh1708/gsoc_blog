// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Mobile Nav =====
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    mobileToggle.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileToggle.textContent = '☰';
    });
  });
}

// ===== Scroll Animations =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--accent)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ===== Contribution Tabs =====
const contribTabs = document.querySelectorAll('.contrib-tab');
const contribPanels = document.querySelectorAll('.contrib-panel');

contribTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    contribTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    contribPanels.forEach(p => {
      p.style.display = p.dataset.panel === target ? 'grid' : 'none';
    });
  });
});

// ===== Blog Filters =====
const blogFilters = document.querySelectorAll('.blog-filter');
const blogCards = document.querySelectorAll('.blog-card');

blogFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    blogFilters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const cat = filter.dataset.cat;
    blogCards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== GitHub Contribution Graph =====
function renderGraph() {
  const grid = document.getElementById('github-graph');
  if (!grid) return;
  // Simulated contribution data
  const levels = [0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 3, 0, 0, 1, 2, 0, 0, 0, 1, 0, 4, 0, 1, 0, 0, 2, 3];
  for (let i = 0; i < 52 * 7; i++) {
    const cell = document.createElement('div');
    cell.className = 'graph-cell';
    const rand = Math.random();
    if (rand > 0.85) cell.classList.add('l4');
    else if (rand > 0.7) cell.classList.add('l3');
    else if (rand > 0.55) cell.classList.add('l2');
    else if (rand > 0.4) cell.classList.add('l1');
    grid.appendChild(cell);
  }
}
renderGraph();

// ===== Copy Code Button =====
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.addEventListener('click', () => {
    const code = pre.querySelector('code')?.textContent || pre.textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    });
  });
  pre.style.position = 'relative';
  pre.appendChild(btn);
});

// ===== Smooth Navbar Shadow =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ===== Typing Effect for Hero =====
function typeWriter(el, text, speed = 50) {
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

const heroTyping = document.getElementById('hero-typing');
if (heroTyping) {
  const text = heroTyping.dataset.text;
  typeWriter(heroTyping, text, 40);
}

// ===== Syntax Highlighting (Tokyo Night) =====
if (document.querySelector('pre code')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/tokyo-night-dark.min.css';
  document.head.appendChild(link);
  
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
  
  script.onload = () => {
    // Add Julia language explicitly as it's not always in the common bundle
    const juliaScript = document.createElement('script');
    juliaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/julia.min.js';
    juliaScript.onload = () => {
      document.querySelectorAll('pre code').forEach((block) => {
        if (!block.className) block.classList.add('language-julia');
        hljs.highlightElement(block);
      });
    };
    document.head.appendChild(juliaScript);
  };
  document.head.appendChild(script);
}
