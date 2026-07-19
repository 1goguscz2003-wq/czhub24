const storageKey = 'czhub24-analytics';
const langKey = 'czhub24-lang';

async function loadConfig() {
  try {
    const response = await fetch('./data/site-data.json');
    if (!response.ok) throw new Error('Не удалось получить данные');
    return response.json();
  } catch (error) {
    console.warn(error);
    return {
      platforms: [
        { id: 'telegram', name: 'Telegram', url: 'https://t.me/czhub24' },
        { id: 'whatsapp', name: 'WhatsApp', url: 'https://chat.whatsapp.com/G0YbngLJZs62JZ8QLef0mj' },
        { id: 'viber', name: 'Viber', url: 'https://invite.viber.com/?g2=AQBEyu%2BkYLoW5lbe0flu%2BPnAUDrUZUpv64chJAs9SWpAFdDAF2TzTHJG0yqUd2xn' }
      ],
      projects: [
        { title: 'Работа в Чехии', description: 'Обсуждения вакансий, карьерные советы и поддержка новичков.' },
        { title: 'Жильё в Чехии', description: 'Аренда, соседи, документы и полезные контакты.' },
        { title: 'Фушки в Чехии', description: 'Новые проекты, мероприятия и живое общение.' }
      ]
    };
  }
}

function readCounters() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeCounters(counters) {
  localStorage.setItem(storageKey, JSON.stringify(counters));
}

function renderPlatforms(platforms, counters) {
  const container = document.getElementById('platform-buttons');
  if (!container) return;

  container.innerHTML = '';

  const lang = getLang();

  platforms.forEach((platform) => {
    const name = (platform.name && platform.name[lang]) || platform.name || platform.id;
    const meta = (platform.meta && platform.meta[lang]) || platform.meta || '';

    const button = document.createElement('button');
    button.className = 'platform-button neon-pulse';
    button.type = 'button';
    button.innerHTML = `
      <span class="platform-name">${name}</span>
      <span class="platform-meta">${meta}</span>
      <span class="counter-pill">${counters[platform.id] || 0}</span>
    `;

    const analyticsEndpoint = window.__CZHUB24_CONFIG && window.__CZHUB24_CONFIG.analyticsEndpoint;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const nextCounters = { ...counters, [platform.id]: (counters[platform.id] || 0) + 1 };
      writeCounters(nextCounters);
      renderPlatforms(platforms, nextCounters);

      // Fire-and-forget analytics: try navigator.sendBeacon, otherwise fetch
      const payload = { platform: platform.id, time: new Date().toISOString(), lang };
      if (analyticsEndpoint) {
        try {
          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon(analyticsEndpoint, blob);
          } else {
            fetch(analyticsEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(()=>{});
          }
        } catch (err) { /* ignore analytics errors */ }
      }

      // Small timeout to give beacon a chance but keep instant UX
      setTimeout(() => {
        window.location.assign(platform.url);
      }, 40);
    });

    // light indicator if recently clicked
    if ((counters[platform.id] || 0) > 0) button.setAttribute('data-live', '1');

    container.appendChild(button);
  });
}

function renderProjects(projects) {
  const container = document.getElementById('projects-list');
  if (!container) return;
  container.innerHTML = '';

  const lang = getLang();

  projects.forEach((project) => {
    const title = (project.title && project.title[lang]) || project.title || '';
    const desc = (project.description && project.description[lang]) || project.description || '';
    const card = document.createElement('article');
    card.className = 'project-item';
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    container.appendChild(card);
  });
}

function getLang() {
  try {
    const stored = localStorage.getItem(langKey);
    if (stored) return stored;
  } catch {}
  return navigator.language && navigator.language.startsWith('uk') ? 'ua' : 'ru';
}

function setLang(l) {
  try { localStorage.setItem(langKey, l); } catch {}
  document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  // update eyebrow and re-render content if config loaded
  if (window.__CZHUB24_CONFIG) {
    const langMapEyebrow = window.__CZHUB24_CONFIG.eyebrow || {};
    const eyebrowEl = document.getElementById('eyebrow');
    if (eyebrowEl) eyebrowEl.textContent = langMapEyebrow[l] || eyebrowEl.textContent;
    const counters = readCounters();
    renderPlatforms(window.__CZHUB24_CONFIG.platforms || [], counters);
    renderProjects(window.__CZHUB24_CONFIG.projects || []);
  }
}

async function init() {
  const config = await loadConfig();
  // expose config globally for dynamic updates
  window.__CZHUB24_CONFIG = config;
  const counters = readCounters();
  renderPlatforms(config.platforms, counters);
  renderProjects(config.projects);

  // language UI
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  const initialLang = getLang();
  setLang(initialLang);
}

init();
