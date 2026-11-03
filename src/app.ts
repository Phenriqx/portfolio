import './style.css';

type Category = 'backend' | 'dados' | 'ferramentas';
type Filter = Category | 'todos';
type Theme = 'light' | 'dark';
type Project = { number: string; category: Category; context: string; title: string; description: string; detail: string; tags: string[]; href: string };

const projects: Project[] = [
  { number: '01', category: 'backend', context: 'Aplicação backend', title: 'Plataforma de pagamentos', description: 'Transferências entre carteiras com regras de negócio, autorização externa e persistência.', detail: 'API em Java e Spring Boot organizada como monólito modular. O repositório documenta validação de saldo, transações e testes de unidade, integração e fronteiras entre módulos.', tags: ['Java', 'Spring Boot', 'Spring Modulith'], href: 'https://github.com/Phenriqx/picpay-desafio-backend' },
  { number: '02', category: 'dados', context: 'Iniciação científica · UFOP', title: 'Equidade algorítmica no ENEM', description: 'Investigação de diferenças de desempenho e critérios de equidade em modelos aplicados a dados educacionais.', detail: 'A pesquisa reúne análises estatísticas por grupo e métricas de fairness. Discute os trade-offs entre desempenho preditivo e critérios de equidade, sem reduzir o resultado a um único número.', tags: ['Python', 'Fairlearn', 'Estatística'], href: 'https://github.com/Phenriqx/algorithmic-fairness-enem' },
  { number: '03', category: 'ferramentas', context: 'Aplicação desktop', title: 'CoreStat', description: 'Monitoramento de processos, CPU e memória com Go, Svelte e Wails.', detail: 'Aplicação que aproxima coleta de dados do sistema e interface web. Algumas leituras de frequência e temperatura dependem de recursos do Linux.', tags: ['Go', 'Svelte', 'Wails'], href: 'https://github.com/Phenriqx/corestat' },
  { number: '04', category: 'dados', context: 'Experimento em dados', title: 'Taxas de homicídio', description: 'Previsão com separação temporal dos dados e avaliação por múltiplas métricas.', detail: 'O projeto inclui divisão temporal e avaliação com MAE, RMSE e R². A documentação dos dados e dos resultados ainda está em evolução.', tags: ['Python', 'Scikit-learn', 'Séries temporais'], href: 'https://github.com/Phenriqx/global-homicide-rate-predictor' },
  { number: '05', category: 'ferramentas', context: 'Ferramenta de linha de comando', title: 'ghx', description: 'CLI em Go para operações de repositórios e pull requests no GitHub.', detail: 'Usa Cobra e Resty para organizar comandos e integração com a API do GitHub. O README apresenta instalação e operações disponíveis.', tags: ['Go', 'Cobra', 'GitHub API'], href: 'https://github.com/Phenriqx/ghx' },
];

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Elemento principal não encontrado.');

app.innerHTML = `
  <header class="site-header" id="inicio"><div class="shell header-inner">
    <a class="brand" href="#inicio" aria-label="Pedro Henrique Menezes, início"><span class="brand-symbol">p<span>h</span>.</span><span class="brand-label">Pedro Henrique<br>Menezes</span></a>
    <nav class="site-nav" aria-label="Navegação principal"><a href="#trabalhos">Trabalhos</a><a href="#trajetoria">Trajetória</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav>
    <button class="theme-toggle" type="button" id="theme-toggle" aria-label="Ativar modo escuro" aria-pressed="false"><span class="theme-icon" aria-hidden="true">◐</span><span class="theme-label">Escuro</span></button>
  </div></header>
  <main id="conteudo">
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-topline"><span>PORTFÓLIO / 2026</span><span>DESENVOLVIMENTO · DADOS · QUALIDADE</span></div>
      <div class="hero-title-wrap"><p class="hero-kicker"><span class="availability-dot" aria-hidden="true"></span> Aberto a estágios em backend e Dados/IA</p><h1 id="hero-title">Pedro Henrique<br><span>Menezes<span class="period">.</span></span></h1></div>
      <div class="hero-bottom"><p class="hero-statement">Construo sistemas e investigo as decisões que eles produzem.</p><div class="hero-intro"><p>Estudante de Ciência da Computação na UFOP. Minha trajetória combina desenvolvimento backend, experiência em QA e pesquisa em equidade de modelos de aprendizado de máquina.</p><a class="underlined-link" href="#trabalhos">Conhecer meu trabalho <span aria-hidden="true">↘</span></a></div></div>
      <div class="hero-footnote"><span>01 — SOFTWARE</span><span>02 — DADOS & IA</span><span>03 — QUALIDADE</span><span>ROLE PARA EXPLORAR ↓</span></div>
    </section>
    <section class="work-section shell section" id="trabalhos" aria-labelledby="work-title">
      <div class="section-heading"><p class="section-index">01 / TRABALHOS SELECIONADOS</p><h2 id="work-title">O que venho <em>construindo.</em></h2><p>Uma seleção de projetos com problemas, escolhas técnicas e limites diferentes. Abra os detalhes para entender o recorte de cada trabalho.</p></div>
      <div class="work-toolbar"><div class="filter-group" role="group" aria-label="Filtrar trabalhos"><button type="button" class="filter is-active" data-filter="todos" aria-pressed="true">Todos</button><button type="button" class="filter" data-filter="backend" aria-pressed="false">Backend</button><button type="button" class="filter" data-filter="dados" aria-pressed="false">Dados & IA</button><button type="button" class="filter" data-filter="ferramentas" aria-pressed="false">Ferramentas</button></div><span class="work-count" id="work-count">05 trabalhos</span></div>
      <div class="work-list" id="work-list" aria-live="polite"></div>
      <div class="work-outro"><span>Quer explorar além desta seleção?</span><a class="underlined-link" href="https://github.com/Phenriqx?tab=repositories" target="_blank" rel="noopener noreferrer">Ver todos os repositórios <span aria-hidden="true">↗</span></a></div>
    </section>
    <section class="trajectory-section section" id="trajetoria" aria-labelledby="trajectory-title"><div class="shell trajectory-layout"><div class="trajectory-intro"><p class="section-index">02 / TRAJETÓRIA</p><h2 id="trajectory-title">Experiência que muda meu jeito de <em>pensar.</em></h2><p>Construir, testar e pesquisar são partes do mesmo processo: formular boas perguntas e conferir as respostas.</p></div><div class="trajectory-list">
      <article class="trajectory-item"><div class="trajectory-meta"><span>2025 — 2026</span><span>01</span></div><h3>Estágio em QA</h3><p class="trajectory-place">TerraLAB · UFOP</p><p>Automação de testes de ponta a ponta e de componentes, cenários para APIs e colaboração com desenvolvimento na investigação de falhas.</p><div class="tag-list"><span>Playwright</span><span>Jest</span><span>BDD</span></div></article>
      <article class="trajectory-item"><div class="trajectory-meta"><span>DESDE 2026</span><span>02</span></div><h3>Iniciação científica</h3><p class="trajectory-place">Equidade em aprendizado de máquina · UFOP</p><p>Análise estatística de dados educacionais e avaliação de critérios de equidade em modelos preditivos.</p><div class="tag-list"><span>Python</span><span>Fairlearn</span><span>Estatística</span></div></article>
    </div></div></section>
    <section class="about-section shell section" id="sobre" aria-labelledby="about-title"><p class="section-index">03 / SOBRE</p><div class="about-layout"><h2 id="about-title">Curiosidade técnica.<br><em>Critério prático.</em></h2><div class="about-copy"><p>Gosto de entender por que uma solução funciona, onde ela falha e como explicar suas decisões. No backend, isso aparece na modelagem e nas regras de negócio. Em QA, na validação do comportamento real. Em pesquisa, na avaliação dos dados e dos modelos.</p><p>Busco estágios em que eu possa contribuir com software útil, aprender com uma equipe e aprofundar minha atuação em backend ou Dados/IA.</p><a class="underlined-link" href="https://www.linkedin.com/in/pedro-henrique-menezes-901171217/" target="_blank" rel="noopener noreferrer">Mais sobre minha trajetória no LinkedIn <span aria-hidden="true">↗</span></a></div></div><div class="about-facts"><div><span>FORMAÇÃO</span><strong>Ciência da Computação</strong><small>Universidade Federal de Ouro Preto</small></div><div><span>ÁREAS DE INTERESSE</span><strong>Backend · Dados/IA</strong><small>Com experiência em qualidade de software</small></div><div><span>BASE TÉCNICA</span><strong>Java · Python · Go</strong><small>Testes, APIs e análise de dados</small></div></div></section>
    <section class="contact-section" id="contato" aria-labelledby="contact-title"><div class="shell"><p class="section-index">04 / CONTATO</p><div class="contact-layout"><div><h2 id="contact-title">Temos algo para <em>conversar?</em></h2><p>Se meu trabalho fizer sentido para sua equipe, ficarei feliz em conhecer o problema e trocar ideias.</p></div><div class="contact-actions"><a class="contact-email" href="mailto:phenriqx.dev@gmail.com">phenriqx.dev@gmail.com <span aria-hidden="true">↗</span></a><button class="copy-button" type="button" id="copy-email">Copiar e-mail <span aria-hidden="true">⧉</span></button><span class="copy-feedback" id="copy-feedback" role="status" aria-live="polite"></span></div></div></div></section>
  </main>
  <footer class="site-footer shell"><span>© ${new Date().getFullYear()} Pedro Henrique Menezes</span><div><a href="https://github.com/Phenriqx" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/pedro-henrique-menezes-901171217/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#inicio">Voltar ao início ↑</a></div></footer>
`;

const list = document.querySelector<HTMLDivElement>('#work-list');
const count = document.querySelector<HTMLElement>('#work-count');
const filters = [...document.querySelectorAll<HTMLButtonElement>('.filter')];

function renderProjects(filter: Filter): void {
  if (!list || !count) return;
  const visible = filter === 'todos' ? projects : projects.filter(project => project.category === filter);
  list.innerHTML = visible.map(project => `<article class="work-item"><span class="work-number">${project.number}</span><div class="work-main"><span class="work-context">${project.context}</span><h3>${project.title}</h3><div class="tag-list">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><div class="work-description"><p>${project.description}</p><details><summary>Contexto e decisões</summary><p>${project.detail}</p></details></div><a class="work-link" href="${project.href}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${project.title} no GitHub">↗</a></article>`).join('');
  count.textContent = `${String(visible.length).padStart(2, '0')} ${visible.length === 1 ? 'trabalho' : 'trabalhos'}`;
}

filters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter as Filter;
  filters.forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
  renderProjects(filter);
}));
renderProjects('todos');

const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle');
const themeLabel = themeButton?.querySelector<HTMLElement>('.theme-label');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const storageKey = 'phm-portfolio-theme';

function storedTheme(): Theme | null {
  try { const value = localStorage.getItem(storageKey); return value === 'dark' || value === 'light' ? value : null; }
  catch { return null; }
}
function setTheme(theme: Theme, save = false): void {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
  if (themeLabel) themeLabel.textContent = dark ? 'Claro' : 'Escuro';
  themeColor?.setAttribute('content', dark ? '#111820' : '#f5f5f0');
  if (save) { try { localStorage.setItem(storageKey, theme); } catch { /* Preferência local indisponível. */ } }
}
setTheme(storedTheme() ?? (systemTheme.matches ? 'dark' : 'light'));
themeButton?.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));
systemTheme.addEventListener('change', event => { if (!storedTheme()) setTheme(event.matches ? 'dark' : 'light'); });

document.querySelector<HTMLButtonElement>('#copy-email')?.addEventListener('click', async () => {
  const feedback = document.querySelector<HTMLElement>('#copy-feedback');
  if (!feedback) return;
  try { await navigator.clipboard.writeText('phenriqx.dev@gmail.com'); feedback.textContent = 'E-mail copiado.'; }
  catch { feedback.textContent = 'Não foi possível copiar. Use o link de e-mail acima.'; }
});
