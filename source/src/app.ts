import './style.css';
import { content, type Filter, type Language } from './content';

type Theme = 'light' | 'dark';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Elemento principal não encontrado.');

const languageKey = 'phm-portfolio-language';
const themeKey = 'phm-portfolio-theme';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function storedLanguage(): Language | null {
  try {
    const value = localStorage.getItem(languageKey);
    return value === 'pt' || value === 'en' ? value : null;
  } catch { return null; }
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(themeKey);
    return value === 'dark' || value === 'light' ? value : null;
  } catch { return null; }
}

let language: Language = storedLanguage() ?? 'pt';
let theme: Theme = storedTheme() ?? (systemTheme.matches ? 'dark' : 'light');
let currentFilter: Filter = 'todos';
let renderVersion = 0;

function setTheme(next: Theme, save = false): void {
  theme = next;
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle');
  button?.setAttribute('aria-pressed', String(dark));
  button?.setAttribute('aria-label', dark ? content[language].activateLight : content[language].activateDark);
  const label = button?.querySelector<HTMLElement>('.theme-label');
  if (label) label.textContent = dark ? content[language].themeLight : content[language].themeDark;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111820' : '#f5f5f0');
  if (save) {
    try { localStorage.setItem(themeKey, theme); } catch { /* Theme still works for this visit. */ }
  }
}

function renderProjects(expanded = new Set<string>()): void {
  const list = document.querySelector<HTMLDivElement>('#work-list');
  const count = document.querySelector<HTMLElement>('#work-count');
  if (!list || !count) return;
  const t = content[language];
  const filter = currentFilter;
  const visible = filter === 'todos'
    ? t.projects
    : t.projects.filter(project => Array.isArray(project.category)
      ? project.category.includes(filter)
      : project.category === filter);

  list.innerHTML = visible.map(project => `
    <article class="work-item" data-number="${project.number}">
      <span class="work-number">${project.number}</span>
      <div class="work-main"><span class="work-context">${project.context}</span><h3>${project.title}</h3><div class="tag-list">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
      <div class="work-description"><p>${project.description}</p><details${expanded.has(project.number) ? ' open' : ''}><summary>${t.workDetails}</summary><p>${project.detail}</p></details></div>
      <a class="work-link" href="${project.href}" target="_blank" rel="noopener noreferrer" aria-label="${t.viewOnGitHub} ${project.title} ${t.onGitHub}">↗</a>
    </article>
  `).join('');
  count.textContent = `${String(visible.length).padStart(2, '0')} ${visible.length === 1 ? t.workSingular : t.workPlural}`;
}

function showFullName(): void {
  document.querySelectorAll<HTMLElement>('.name-line').forEach(line => {
    const copy = line.querySelector<HTMLElement>('.typing-copy');
    if (copy) copy.textContent = line.dataset.text ?? '';
    const period = line.querySelector<HTMLElement>('.period');
    if (period) period.hidden = false;
    line.classList.remove('is-typing');
  });
}

function pause(duration: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

async function typeName(version: number): Promise<void> {
  for (const line of document.querySelectorAll<HTMLElement>('.name-line')) {
    if (version !== renderVersion || motionPreference.matches) return;
    const copy = line.querySelector<HTMLElement>('.typing-copy');
    if (!copy) continue;
    line.classList.add('is-typing');
    for (const character of Array.from(line.dataset.text ?? '')) {
      if (version !== renderVersion || motionPreference.matches) return;
      copy.textContent += character;
      await pause(character === ' ' ? 120 : 70);
    }
    const period = line.querySelector<HTMLElement>('.period');
    if (period) period.hidden = false;
    await pause(300);
    if (version !== renderVersion || motionPreference.matches) return;
    line.classList.remove('is-typing');
  }
}

function renderPage(animateName = false, expanded = new Set<string>()): void {
  const t = content[language];
  const version = ++renderVersion;
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = t.pageTitle;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', t.metaDescription);
  const skipLink = document.querySelector<HTMLAnchorElement>('.skip-link');
  if (skipLink) skipLink.textContent = t.skip;

  app!.innerHTML = `
    <header class="site-header" id="inicio"><div class="shell header-inner">
      <a class="brand" href="#inicio" aria-label="${t.brandHome}"><span class="brand-symbol">p<span>h</span>.</span><span class="brand-label">Pedro Henrique<br>Menezes</span></a>
      <nav class="site-nav" aria-label="${t.navigation}"><a href="#trabalhos">${t.navWork}</a><a href="#trajetoria">${t.navTrajectory}</a><a href="#sobre">${t.navAbout}</a><a href="#contato">${t.navContact}</a></nav>
      <label class="language-picker"><span class="sr-only">${t.languageLabel}</span><select id="language-select"><option value="pt"${language === 'pt' ? ' selected' : ''}>PT</option><option value="en"${language === 'en' ? ' selected' : ''}>EN</option></select></label>
      <button class="theme-toggle" type="button" id="theme-toggle" aria-pressed="false"><span class="theme-icon" aria-hidden="true">◐</span><span class="theme-label"></span></button>
    </div></header>
    <main id="conteudo">
      <section class="hero shell" aria-labelledby="hero-title">
        <div class="hero-topline"><span>${t.heroTopline}</span><span>${t.heroAreas}</span></div>
        <div class="hero-title-wrap"><p class="hero-kicker"><span class="availability-dot" aria-hidden="true"></span> ${t.heroAvailability}</p><h1 id="hero-title" aria-label="Pedro Henrique Menezes"><span class="name-line" data-text="Pedro Henrique" aria-hidden="true"><span class="name-placeholder">Pedro Henrique</span><span class="name-typed"><span class="typing-copy"></span></span></span><span class="name-line name-line-last" data-text="Menezes" aria-hidden="true"><span class="name-placeholder">Menezes.</span><span class="name-typed"><span class="typing-copy"></span><span class="period" hidden>.</span></span></span></h1></div>
        <div class="hero-bottom"><p class="hero-statement">${t.heroStatement}</p><div class="hero-intro"><p>${t.heroIntro}</p><a class="underlined-link" href="#trabalhos">${t.heroLink} <span aria-hidden="true">↘</span></a></div></div>
        <div class="hero-footnote"><span>${t.heroSoftware}</span><span>${t.heroData}</span><span>${t.heroQuality}</span><span>${t.heroScroll}</span></div>
      </section>
      <section class="work-section shell section" id="trabalhos" aria-labelledby="work-title">
        <div class="section-heading"><p class="section-index">${t.workIndex}</p><h2 id="work-title">${t.workTitle} <em>${t.workTitleEmphasis}</em></h2><p>${t.workIntro}</p></div>
        <div class="work-toolbar"><div class="filter-group" role="group" aria-label="${t.filterLabel}"><button type="button" class="filter" data-filter="todos">${t.filterAll}</button><button type="button" class="filter" data-filter="backend">${t.filterBackend}</button><button type="button" class="filter" data-filter="dados">${t.filterData}</button><button type="button" class="filter" data-filter="ferramentas">${t.filterTools}</button></div><span class="work-count" id="work-count"></span></div>
        <div class="work-list" id="work-list" aria-live="polite"></div>
        <div class="work-outro"><span>${t.workOutro}</span><a class="underlined-link" href="https://github.com/Phenriqx?tab=repositories" target="_blank" rel="noopener noreferrer">${t.workAllRepositories} <span aria-hidden="true">↗</span></a></div>
      </section>
      <section class="trajectory-section section" id="trajetoria" aria-labelledby="trajectory-title"><div class="shell trajectory-layout"><div class="trajectory-intro"><p class="section-index">${t.trajectoryIndex}</p><h2 id="trajectory-title">${t.trajectoryTitle} <em>${t.trajectoryTitleEmphasis}</em></h2><p>${t.trajectoryIntro}</p></div><div class="trajectory-list">
        <article class="trajectory-item"><div class="trajectory-meta"><span>2025 — 2026</span><span>01</span></div><h3>${t.qaTitle}</h3><p class="trajectory-place">${t.qaPlace}</p><p>${t.qaDescription}</p><div class="tag-list"><span>Playwright</span><span>Jest</span><span>BDD</span></div></article>
        <article class="trajectory-item"><div class="trajectory-meta"><span>${t.researchDate}</span><span>02</span></div><h3>${t.researchTitle}</h3><p class="trajectory-place">${t.researchPlace}</p><p>${t.researchDescription}</p><div class="tag-list"><span>Python</span><span>Fairlearn</span><span>${t.researchTag}</span></div></article>
      </div></div></section>
      <section class="about-section shell section" id="sobre" aria-labelledby="about-title"><p class="section-index">${t.aboutIndex}</p><div class="about-layout"><h2 id="about-title">${t.aboutTitle}<br><em>${t.aboutTitleEmphasis}</em></h2><div class="about-copy"><p>${t.aboutFirst}</p><p>${t.aboutSecond}</p><a class="underlined-link" href="https://www.linkedin.com/in/pedro-henrique-menezes-901171217/" target="_blank" rel="noopener noreferrer">${t.aboutLinkedIn} <span aria-hidden="true">↗</span></a></div></div><div class="about-facts"><div><span>${t.educationLabel}</span><strong>${t.educationValue}</strong><small>${t.educationPlace}</small></div><div><span>${t.interestsLabel}</span><strong>${t.interestsValue}</strong><small>${t.interestsDetail}</small></div><div><span>${t.skillsLabel}</span><strong>${t.skillsValue}</strong><small>${t.skillsDetail}</small><small>${t.certification}</small></div></div></section>
      <section class="contact-section" id="contato" aria-labelledby="contact-title"><div class="shell"><p class="section-index">${t.contactIndex}</p><div class="contact-layout"><div><h2 id="contact-title">${t.contactTitle} <em>${t.contactTitleEmphasis}</em></h2><p>${t.contactIntro}</p></div><div class="contact-actions"><a class="contact-email" href="mailto:phenriqx.dev@gmail.com">phenriqx.dev@gmail.com <span aria-hidden="true">↗</span></a><button class="copy-button" type="button" id="copy-email">${t.copyEmail} <span aria-hidden="true">⧉</span></button><span class="copy-feedback" id="copy-feedback" role="status" aria-live="polite"></span></div></div></div></section>
    </main>
    <footer class="site-footer shell"><span>© ${new Date().getFullYear()} Pedro Henrique Menezes</span><div><a href="https://github.com/Phenriqx" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/pedro-henrique-menezes-901171217/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#inicio">${t.backToTop} ↑</a></div></footer>
  `;

  setTheme(theme);
  renderProjects(expanded);
  const filters = [...document.querySelectorAll<HTMLButtonElement>('.filter')];
  filters.forEach(button => {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter as Filter;
      filters.forEach(item => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      renderProjects();
    });
  });

  document.querySelector<HTMLSelectElement>('#language-select')?.addEventListener('change', event => {
    const next = (event.currentTarget as HTMLSelectElement).value;
    if (next !== 'pt' && next !== 'en') return;
    const scrollY = window.scrollY;
    const openDetails = new Set([...document.querySelectorAll<HTMLDetailsElement>('.work-item details[open]')]
      .map(details => details.closest<HTMLElement>('.work-item')?.dataset.number)
      .filter((number): number is string => Boolean(number)));
    language = next;
    try { localStorage.setItem(languageKey, language); } catch { /* Language still works for this visit. */ }
    renderPage(false, openDetails);
    document.querySelector<HTMLSelectElement>('#language-select')?.focus({ preventScroll: true });
    window.scrollTo(0, scrollY);
  });

  document.querySelector<HTMLButtonElement>('#theme-toggle')?.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark', true));
  document.querySelector<HTMLButtonElement>('#copy-email')?.addEventListener('click', async () => {
    const feedback = document.querySelector<HTMLElement>('#copy-feedback');
    if (!feedback) return;
    try { await navigator.clipboard.writeText('phenriqx.dev@gmail.com'); feedback.textContent = t.copiedEmail; }
    catch { feedback.textContent = t.copyFailed; }
  });

  if (animateName && !motionPreference.matches) void typeName(version);
  else showFullName();
}

motionPreference.addEventListener('change', event => {
  if (event.matches) { renderVersion++; showFullName(); }
});
systemTheme.addEventListener('change', event => {
  if (!storedTheme()) setTheme(event.matches ? 'dark' : 'light');
});
renderPage(true);
