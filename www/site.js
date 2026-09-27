const root = document.documentElement;
const header = document.querySelector('.muze-site-header');
const themeButton = document.querySelector('.muze-theme-toggle');
const menuButton = document.querySelector('.muze-menu-toggle');
const nav = document.querySelector('#primary-nav');

const applyTheme = (theme) => {
  root.classList.remove('ds-darkmode', 'ds-lightmode', 'ds-darkmode-auto');
  if (theme === 'dark') {
    root.classList.add('ds-darkmode');
    root.dataset.theme = 'dark';
  } else if (theme === 'light') {
    root.classList.add('ds-lightmode');
    root.dataset.theme = 'light';
  } else {
    root.classList.add('ds-darkmode-auto');
    delete root.dataset.theme;
  }
};

const savedTheme = localStorage.getItem('muze-theme');
applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null);

themeButton?.addEventListener('click', () => {
  const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('muze-theme', next);
});

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.dataset.open = String(!open);
});


const searchToggle = document.querySelector('.muze-search-toggle');
const searchForm = document.querySelector('.muze-search-form');
const searchInput = document.querySelector('#site-search-query');

searchToggle?.addEventListener('click', () => {
  const open = searchToggle.getAttribute('aria-expanded') === 'true';
  searchToggle.setAttribute('aria-expanded', String(!open));
  if (searchForm) searchForm.hidden = open;
  if (!open) requestAnimationFrame(() => searchInput?.focus());
});

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput?.value.trim();
  if (!query) {
    searchInput?.focus();
    return;
  }
  const scopedQuery = `${query} site:muze.nl`;
  window.location.href = `https://search.brave.com/search?q=${encodeURIComponent(scopedQuery)}`;
});

searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    searchForm.hidden = true;
    searchToggle?.setAttribute('aria-expanded', 'false');
    searchToggle?.focus();
  }
});

const updateHeader = () => header?.classList.toggle('muze-is-compact', window.scrollY > 28);
updateHeader();
addEventListener('scroll', updateHeader, { passive: true });


// Elsewhere archive filters. The URL is the state, so filters remain linkable.
const elsewhereItems = [...document.querySelectorAll('.muze-elsewhere-item')];
if (elsewhereItems.length) {
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic');
  const date = params.get('date');
  const kind = params.get('kind');
  const status = document.querySelector('.muze-elsewhere-status');
  const clear = document.querySelector('.muze-elsewhere-clear');

  const matches = (item) => {
    const topics = (item.dataset.topics || '').split(/\s+/);
    return (!topic || topics.includes(topic)) && (!date || item.dataset.date === date) && (!kind || item.dataset.kind === kind);
  };

  let count = 0;
  elsewhereItems.forEach((item) => {
    item.hidden = !matches(item);
    if (!item.hidden) count += 1;
  });

  const active = topic ? `topic: ${topic.replaceAll('-', ' ')}` : date ? `date: ${date}` : kind ? `kind: ${kind}` : '';
  if (status) status.textContent = active ? `${count} item${count === 1 ? '' : 's'} · ${active}` : `${count} items`;
  if (clear) clear.hidden = !active;
  clear?.addEventListener('click', () => { location.href = 'elsewhere.html'; });

  document.querySelectorAll('.muze-elsewhere-controls a').forEach((link) => {
    const url = new URL(link.href, location.href);
    if ((topic && url.searchParams.get('topic') === topic) || (date && url.searchParams.get('date') === date) || (kind && url.searchParams.get('kind') === kind)) {
      link.setAttribute('aria-current', 'true');
    }
  });
}
