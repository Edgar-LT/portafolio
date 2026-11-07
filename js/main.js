/* ==========================================================================
   CONTROLADOR PRINCIPAL DEL PORTAFOLIO (js/main.js)
   Edgar López — Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   ========================================================================== */

import { PORTFOLIO_DATA } from "./data.js";
import { I18N_DICTIONARY } from "./i18n.js";

let currentLang = localStorage.getItem("edgar_lang") === "en" ? "en" : "es";
let currentProjectFilter = "all";
let cachedGithubRepos = null;

/**
 * Sanitiza cualquier cadena de texto para evitar vulnerabilidades XSS
 * al renderizar contenido dinámico interpolado en plantillas HTML.
 * @param {unknown} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function t(key) {
  const dict = I18N_DICTIONARY || {};
  const langDict = dict[currentLang] || dict.es || {};
  const esDict = dict.es || {};
  return langDict[key] || esDict[key] || key;
}

function bootstrapPortfolio() {
  try {
    initTheme();
    initLanguage(PORTFOLIO_DATA);
    initProjects(PORTFOLIO_DATA.projects);
    initSkills(PORTFOLIO_DATA.skillCategories);
    initTimeline(PORTFOLIO_DATA.timeline);
    initMobileMenu();
    initScrollSpy();
    initProjectModal(PORTFOLIO_DATA.projects);
    initGithubTelemetry(PORTFOLIO_DATA.profile?.githubUser || "Edgar-LT");
    initContactForm();
  } catch (err) {
    console.error("[Portfolio] Error inicializando modulos:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapPortfolio);
} else {
  bootstrapPortfolio();
}

/* ==========================================================================
   0. GESTIÓN DE TEMA (CLARO LUMINOSO / AZUL NOCHE) Y LENGUAJE (ES / EN)
   ========================================================================== */
function syncThemeUI() {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-toggle-icon");
  const themeLabel = document.getElementById("theme-toggle-label");
  const metaTheme = document.getElementById("meta-theme-color");

  const isDark = htmlEl.classList.contains("dark");
  if (themeIcon) {
    themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
  }
  if (themeLabel) {
    themeLabel.textContent = isDark ? t("theme_light") : t("theme_dark");
  }
  if (themeBtn) {
    themeBtn.setAttribute("aria-pressed", String(isDark));
  }
  if (metaTheme) {
    metaTheme.setAttribute("content", isDark ? "#0b1120" : "#2563eb");
  }
}

function initTheme() {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle-btn");

  syncThemeUI();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = htmlEl.classList.toggle("dark");
      localStorage.setItem("edgar_theme", isDark ? "dark" : "light");
      syncThemeUI();
    });
  }
}

function applyTranslations(data) {
  document.documentElement.lang = currentLang;

  const langLabel = document.getElementById("lang-toggle-label");
  if (langLabel) {
    langLabel.textContent = currentLang.toUpperCase();
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (key) el.innerHTML = t(key);
  });

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const msgInput = document.getElementById("message");
  if (nameInput) nameInput.placeholder = t("form_name_ph");
  if (emailInput) emailInput.placeholder = t("form_email_ph");
  if (msgInput) msgInput.placeholder = t("form_msg_ph");

  syncThemeUI();
  renderProjects(data.projects, currentProjectFilter);
  initSkills(data.skillCategories);
  initTimeline(data.timeline);
  if (cachedGithubRepos) {
    renderGithubRepos(cachedGithubRepos);
  }
}

function initLanguage(data) {
  const langBtn = document.getElementById("lang-toggle-btn");
  if (currentLang === "en") {
    applyTranslations(data);
  }

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      localStorage.setItem("edgar_lang", currentLang);
      applyTranslations(data);
    });
  }
}

/* ==========================================================================
   PALETA DE IDENTIDAD POR DISCIPLINA (AZUL / ÍNDIGO / ESMERALDA)
   ========================================================================== */
function getAccentClasses(accent) {
  switch (accent) {
    case "indigo":
      return {
        badge: "bg-indigo-600 text-white",
        iconBox: "bg-indigo-600 text-white shadow-sm",
        topBar: "bg-indigo-600",
        linkText: "text-indigo-600 dark:text-indigo-400"
      };
    case "teal":
      return {
        badge: "bg-teal-700/15 text-teal-800 dark:text-teal-300 border border-teal-500/25",
        iconBox: "bg-teal-700/15 text-teal-700 dark:text-teal-300 border border-teal-500/30",
        topBar: "bg-teal-600",
        linkText: "text-teal-700 dark:text-teal-400"
      };
    default:
      return {
        badge: "bg-neutral-800/10 text-neutral-900 dark:bg-white/10 dark:text-neutral-200 border border-neutral-300 dark:border-white/10",
        iconBox: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm",
        topBar: "bg-neutral-900 dark:bg-white",
        linkText: "theme-heading"
      };
  }
}

function getPublishedProjects(projects) {
  return (projects || []).filter((p) => p.published !== false);
}

/* ==========================================================================
   1. RENDERIZADO DINÁMICO Y FILTRADO DE PROYECTOS (WCAG 2.1 AA COMPLIANT)
   ========================================================================== */
function renderProjectPreview(project, styles) {
  const rawTitle = currentLang === "en" && project.titleEn ? project.titleEn : project.title;
  const rawCategoryLabel =
    currentLang === "en" && project.categoryLabelEn ? project.categoryLabelEn : project.categoryLabel;
  const rawRole = currentLang === "en" && project.roleEn ? project.roleEn : project.role;
  const rawStatus = currentLang === "en" && project.statusEn ? project.statusEn : project.status;

  const title = escapeHtml(rawTitle);
  const categoryLabel = escapeHtml(rawCategoryLabel);
  const role = escapeHtml(rawRole);
  const status = escapeHtml(rawStatus);

  if (project.image) {
    return `
      <div class="w-full aspect-video rounded-xl overflow-hidden relative mb-4 identity-subcard bg-slate-950 flex items-center justify-center">
        <img alt="${title}" width="1200" height="675" loading="lazy" decoding="async" class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300" src="${project.image}" />
        <span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${styles.badge}">${categoryLabel}</span>
      </div>
    `;
  }

  return `
    <div class="w-full aspect-video rounded-xl identity-subcard bg-blueprint mb-4 p-5 flex flex-col justify-between relative overflow-hidden">
      <div class="flex items-center justify-end">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.badge}">${categoryLabel}</span>
      </div>
      <div class="flex items-center gap-3.5 my-auto">
        <div class="w-11 h-11 rounded-xl ${styles.iconBox} flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">${project.icon || "folder_code"}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-display font-bold text-base theme-heading">${title}</span>
          <span class="font-mono text-xs theme-muted">${role}</span>
        </div>
      </div>
      <div class="flex items-center justify-between text-xs font-semibold theme-muted">
        <span>${t("project_status_prefix")}: ${status}</span>
        <span class="theme-accent group-hover:translate-x-0.5 transition-transform">${t("project_details_btn")} →</span>
      </div>
    </div>
  `;
}

function renderProjects(projects, activeFilter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const published = getPublishedProjects(projects);
  const filtered =
    activeFilter === "all"
      ? published
      : published.filter((p) => p.categories.includes(activeFilter));

  grid.innerHTML = filtered
    .map((project) => {
      const styles = getAccentClasses(project.accent);
      const title = currentLang === "en" && project.titleEn ? project.titleEn : project.title;
      const shortDesc =
        currentLang === "en" && project.shortDescriptionEn
          ? project.shortDescriptionEn
          : project.shortDescription;

      const isExternalDemo = /^https?:\/\//i.test(project.demoUrl || "");
      const demoAttrs = isExternalDemo ? 'target="_blank" rel="noopener noreferrer"' : "";

      const safeTags = Array.isArray(project.tags) ? project.tags : [];
      const tagsHtml = safeTags
        .map(
          (tag) =>
            `<span class="px-2.5 py-1 rounded-md identity-chip font-mono text-xs font-medium">${escapeHtml(tag)}</span>`
        )
        .join("");

      return `
        <article class="project-card animate-fade-in flex flex-col justify-between identity-card p-6 rounded-2xl group relative overflow-hidden" data-project-id="${project.id}">
          <div class="absolute top-0 left-0 right-0 h-1.5 ${styles.topBar}"></div>
          <div class="cursor-pointer" data-open-project="${project.id}">
            ${renderProjectPreview(project, styles)}

            <div class="flex flex-col gap-1.5">
              <h3 class="font-display font-bold text-lg sm:text-xl theme-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${title}</h3>
              <p class="text-sm leading-relaxed theme-body">
                ${shortDesc}
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 py-4">
              ${tagsHtml}
            </div>

            <div class="flex items-center justify-between pt-3 border-t theme-border">
              <button type="button" data-open-project="${project.id}" class="text-sm font-semibold theme-accent hover:underline flex items-center gap-1 cursor-pointer">
                <span>${t("project_details_btn")}</span>
                <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_outward</span>
              </button>
              <div class="flex items-center gap-3.5">
                <a class="text-sm font-semibold theme-body hover:underline flex items-center gap-1" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="${t("project_code_btn")} — ${title}">
                  <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
                  <span>${t("project_code_btn")}</span>
                </a>
                <a class="text-sm font-semibold theme-body hover:underline flex items-center gap-1" href="${project.demoUrl}" ${demoAttrs} aria-label="${t("project_demo_btn")} — ${title}">
                  <span class="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
                  <span>${t("project_demo_btn")}</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function initProjects(projects) {
  renderProjects(projects, currentProjectFilter);

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentProjectFilter = btn.getAttribute("data-filter") || "all";

      filterBtns.forEach((b) => {
        b.setAttribute("aria-pressed", "false");
        b.className =
          "filter-btn px-4 py-2 rounded-full text-sm font-medium identity-btn-secondary transition-all cursor-pointer";
      });
      btn.setAttribute("aria-pressed", "true");
      btn.className =
        "filter-btn px-4 py-2 rounded-full text-sm font-semibold nav-pill-active transition-all cursor-pointer";

      renderProjects(projects, currentProjectFilter);
    });
  });
}

/* ==========================================================================
   2. RENDERIZADO DINÁMICO DE STACK TECNOLÓGICO
   ========================================================================== */
function initSkills(categories) {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = (categories || [])
    .map((cat) => {
      const styles = getAccentClasses(cat.accent);
      const title = currentLang === "en" && cat.titleEn ? cat.titleEn : cat.title;
      const desc = currentLang === "en" && cat.descriptionEn ? cat.descriptionEn : cat.description || "";
      const skillList = currentLang === "en" && cat.skillsEn ? cat.skillsEn : cat.skills || [];

      const skillsHtml = skillList
        .map(
          (skill) => `
          <span class="px-3 py-1.5 rounded-lg identity-chip text-sm font-medium">
            ${skill}
          </span>
        `
        )
        .join("");

      return `
        <div class="identity-card p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 ${styles.topBar}"></div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <h3 class="font-display font-bold text-lg theme-heading">${title}</h3>
              <p class="text-sm theme-muted">${desc}</p>
            </div>
            <div class="w-10 h-10 rounded-xl ${styles.iconBox} flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-xl" aria-hidden="true">${cat.icon}</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 pt-1">
            ${skillsHtml}
          </div>
        </div>
      `;
    })
    .join("");
}

/* ==========================================================================
   3. RENDERIZADO DINÁMICO DE LA LÍNEA DE TIEMPO (TRAYECTORIA)
   ========================================================================== */
function initTimeline(timeline) {
  const container = document.getElementById("timeline-list");
  if (!container) return;

  container.innerHTML = (timeline || [])
    .map((item) => {
      const styles = getAccentClasses(item.accent);
      const period = currentLang === "en" && item.periodEn ? item.periodEn : item.period;
      const badge = currentLang === "en" && item.badgeEn ? item.badgeEn : item.badge;
      const title = currentLang === "en" && item.titleEn ? item.titleEn : item.title;
      const desc = currentLang === "en" && item.descriptionEn ? item.descriptionEn : item.description;

      return `
        <div class="identity-card p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
          <div class="absolute top-0 bottom-0 left-0 w-1.5 ${styles.topBar}"></div>
          <div class="flex flex-wrap items-center justify-between gap-2 pl-2">
            <span class="font-mono text-xs font-semibold theme-muted">${period}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.badge}">${badge}</span>
          </div>
          <h3 class="font-display font-bold text-lg theme-heading pl-2">${title}</h3>
          <p class="text-sm leading-relaxed theme-body pl-2">
            ${desc}
          </p>
        </div>
      `;
    })
    .join("");
}

/* ==========================================================================
   4. MODAL DE DETALLES DE PROYECTO (CON FOCUS TRAP ACCESIBLE)
   ========================================================================== */
function initProjectModal(projects) {
  const modal = document.getElementById("project-modal");
  const modalDialog = document.getElementById("project-modal-dialog");
  const modalContent = document.getElementById("project-modal-body");
  const closeBtn = document.getElementById("close-modal-btn");
  const grid = document.getElementById("projects-grid");
  let lastFocusedElement = null;

  if (!modal || !modalContent || !grid) return;

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function openModal(projectId, triggerEl) {
    const project = (projects || []).find((p) => p.id === projectId);
    if (!project) return;

    lastFocusedElement = triggerEl || document.activeElement;
    const styles = getAccentClasses(project.accent);

    const title = currentLang === "en" && project.titleEn ? project.titleEn : project.title;
    const categoryLabel =
      currentLang === "en" && project.categoryLabelEn ? project.categoryLabelEn : project.categoryLabel;
    const role = currentLang === "en" && project.roleEn ? project.roleEn : project.role;
    const status = currentLang === "en" && project.statusEn ? project.statusEn : project.status;
    const shortDesc =
      currentLang === "en" && project.shortDescriptionEn
        ? project.shortDescriptionEn
        : project.shortDescription;
    const problem = currentLang === "en" && project.problemEn ? project.problemEn : project.problem;
    const architecture =
      currentLang === "en" && project.architectureEn ? project.architectureEn : project.architecture;
    const features =
      currentLang === "en" && project.featuresEn ? project.featuresEn : project.features || [];

    const isExternalDemo = /^https?:\/\//i.test(project.demoUrl || "");
    const demoAttrs = isExternalDemo ? 'target="_blank" rel="noopener noreferrer"' : 'data-close-on-click="true"';

    const tagsHtml = (project.tags || [])
      .map(
        (tag) =>
          `<span class="px-3 py-1 rounded-md identity-chip font-mono text-xs font-medium">${tag}</span>`
      )
      .join("");

    const safeMetrics = Array.isArray(project.metrics) ? project.metrics : [];
    const metricsHtml = safeMetrics.length
      ? `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${safeMetrics
            .map(
              (m) => `
              <div class="identity-subcard p-3 rounded-xl flex flex-col">
                <span class="font-mono text-[11px] theme-muted">${escapeHtml(m.label)}</span>
                <span class="font-mono font-bold text-sm theme-heading">${escapeHtml(m.value)}</span>
              </div>
            `
            )
            .join("")}
        </div>
      `
      : "";

    const safeFeatures = Array.isArray(features) ? features : [];
    const featuresHtml = safeFeatures
      .map(
        (feat) => `
        <li class="flex items-start gap-2.5 text-sm theme-body">
          <span class="material-symbols-outlined theme-accent text-lg mt-0.5" aria-hidden="true">check_circle</span>
          <span>${escapeHtml(feat)}</span>
        </li>
      `
      )
      .join("");

    const modalImageHtml = project.image
      ? `
        <div class="w-full aspect-video max-h-72 sm:max-h-80 rounded-xl overflow-hidden identity-subcard bg-slate-950 flex items-center justify-center">
          <img src="${project.image}" alt="${title}" class="w-full h-full object-cover object-center" loading="lazy" />
        </div>
      `
      : "";

    modalContent.innerHTML = `
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2 border-b theme-border pb-4 pr-10">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.badge}">${categoryLabel}</span>
            <span class="text-xs font-mono theme-muted">${role} · ${status}</span>
          </div>
          <h3 id="modal-project-title" class="font-display font-bold text-2xl theme-heading">${title}</h3>
          <p class="text-sm theme-body">${shortDesc}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${tagsHtml}
          </div>
        </div>

        ${modalImageHtml}
        ${metricsHtml}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="identity-subcard p-4 rounded-xl flex flex-col gap-1.5">
            <h4 class="font-display font-bold text-sm theme-heading">${t("modal_challenge")}</h4>
            <p class="text-sm theme-body">${problem}</p>
          </div>

          <div class="identity-subcard p-4 rounded-xl flex flex-col gap-1.5">
            <h4 class="font-display font-bold text-sm theme-heading">${t("modal_arch")}</h4>
            <p class="text-sm theme-body">${architecture}</p>
          </div>
        </div>

        <div class="identity-subcard p-4 rounded-xl flex flex-col gap-2.5">
          <h4 class="font-display font-bold text-sm theme-heading">${t("modal_features")}</h4>
          <ul class="grid grid-cols-1 gap-2">
            ${featuresHtml}
          </ul>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-3 pt-3 border-t theme-border">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full identity-btn-secondary transition-all">
            <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
            <span>${t("modal_repo_btn")}</span>
          </a>
          <a href="${project.demoUrl}" ${demoAttrs} class="btn-primary-action inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all">
            <span>${t("modal_demo_btn")}</span>
            <span class="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
          </a>
        </div>
      </div>
    `;

    modalContent.querySelectorAll('[data-close-on-click="true"]').forEach((link) => {
      link.addEventListener("click", () => {
        closeModal();
      });
    });

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-project]");
    if (trigger) {
      openModal(trigger.getAttribute("data-open-project"), trigger);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab" && modalDialog) {
      const focusable = modalDialog.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}


/* ==========================================================================
   6. INTEGRACIÓN EN VIVO CON GITHUB API (@Edgar-LT)
   ========================================================================== */
const FALLBACK_GITHUB_REPOS = [
  {
    name: "lector-de-pdf",
    description:
      "VoxPDF Studio — Conversor de PDF a Audiolibro con FastAPI, PyMuPDF, síntesis neuronal Edge-TTS y visor interactivo PDF.js.",
    html_url: "https://github.com/Edgar-LT/lector-de-pdf",
    language: "Python",
    updated_at: "2026-10-30T00:00:00Z"
  },
  {
    name: "portafolio",
    description:
      "Portafolio profesional y motor de CV dinámico Data-Driven con simulador de control PID en tiempo real y soporte bilingüe.",
    html_url: "https://github.com/Edgar-LT/portafolio",
    language: "JavaScript",
    updated_at: "2026-10-31T00:00:00Z"
  }
];

function renderGithubRepos(repos) {
  const container = document.getElementById("github-repos-list");
  if (!container) return;

  const topRepos = (repos || []).slice(0, 3);
  container.innerHTML = topRepos
    .map((repo) => {
      const lang = escapeHtml(repo.language || "Code");
      const rawDesc =
        repo.description ||
        (currentLang === "en"
          ? "Public source code repository on GitHub."
          : "Repositorio público de código en GitHub.");
      const desc = escapeHtml(rawDesc);
      const name = escapeHtml(repo.name);
      const safeUrl = encodeURI(repo.html_url || "https://github.com/Edgar-LT");

      return `
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="identity-subcard p-4 rounded-xl flex flex-col justify-between gap-2.5 hover:border-blue-500 transition-all group">
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono font-bold text-xs sm:text-sm theme-heading group-hover:underline truncate">${name}</span>
              <span class="material-symbols-outlined text-sm theme-muted shrink-0" aria-hidden="true">open_in_new</span>
            </div>
            <p class="text-xs theme-body line-clamp-2">${desc}</p>
          </div>
          <div class="flex items-center justify-between text-[11px] font-mono theme-muted pt-1">
            <span class="inline-flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>${lang}</span>
            </span>
            <span>GitHub →</span>
          </div>
        </a>
      `;
    })
    .join("");
}

async function initGithubTelemetry(username) {
  const cacheKey = `edgar_gh_repos_${username}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      cachedGithubRepos = JSON.parse(cached);
      renderGithubRepos(cachedGithubRepos);
      return;
    }

    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (!res.ok) throw new Error("GitHub API status " + res.status);

    const data = await res.json();
    const clean = Array.isArray(data) && data.length ? data.filter((r) => !r.fork) : FALLBACK_GITHUB_REPOS;
    cachedGithubRepos = clean.length ? clean : FALLBACK_GITHUB_REPOS;
    sessionStorage.setItem(cacheKey, JSON.stringify(cachedGithubRepos));
    renderGithubRepos(cachedGithubRepos);
  } catch (err) {
    console.warn("[GitHubTelemetry] Error consultando API de GitHub, aplicando fallback seguro:", err);
    cachedGithubRepos = FALLBACK_GITHUB_REPOS;
    renderGithubRepos(cachedGithubRepos);
  }
}

/* ==========================================================================
   7. NAVEGACIÓN MÓVIL & SCROLL SPY OPTIMIZADO
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuIcon = document.getElementById("mobile-menu-icon");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.setAttribute("aria-expanded", String(!isHidden));
    if (mobileMenuIcon) {
      mobileMenuIcon.textContent = isHidden ? "menu" : "close";
    }
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      if (mobileMenuIcon) mobileMenuIcon.textContent = "menu";
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
  if (!sections.length || !navLinks.length) return;

  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.setAttribute("aria-current", "page");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-full nav-pill-active font-semibold transition-all";
      } else {
        link.removeAttribute("aria-current");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-full theme-body hover:underline transition-all";
      }
    });
  }

  // Modern IntersectionObserver implementation: 0% layout computation on scroll thread
  if ("IntersectionObserver" in window) {
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size > 0) {
          let bestSection = "inicio";
          let maxRatio = -1;
          visibleSections.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              bestSection = id;
            }
          });
          setActiveLink(bestSection);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0.1, 0.3, 0.6]
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  } else {
    // Fallback para navegadores antiguos sin IntersectionObserver
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            let currentSection = "inicio";
            sections.forEach((section) => {
              if (window.scrollY >= section.offsetTop - 150) {
                currentSection = section.getAttribute("id");
              }
            });
            setActiveLink(currentSection);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }
}

/* ==========================================================================
   8. FORMULARIO DUAL DE CONTACTO (CORREO + WHATSAPP + COPIADO 1-CLIC)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const whatsappBtn = document.getElementById("whatsapp-send-btn");
  const formStatus = document.getElementById("form-status");
  const formStatusText = document.getElementById("form-status-text");
  const copyFormMsgBtn = document.getElementById("copy-form-msg-btn");
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyEmailLabel = document.getElementById("copy-email-label");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("Socialedgar0710@gmail.com");
        if (copyEmailLabel) {
          copyEmailLabel.textContent = t("copied_btn");
          setTimeout(() => {
            copyEmailLabel.textContent = t("copy_btn");
          }, 2200);
        }
      } catch (err) {
        console.warn("[ClipboardService] Acceso al portapapeles denegado, redirigiendo a cliente nativo de correo:", err);
        window.location.href = "mailto:Socialedgar0710@gmail.com";
      }
    });
  }

  if (!contactForm || !formStatus) return;

  function buildPayload() {
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const projectSelect = document.getElementById("project-type");
    const projectType =
      projectSelect?.options[projectSelect.selectedIndex]?.text || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const formattedText = `Hola Edgar, te contacto desde tu portafolio web:\n\n• Nombre / Empresa: ${name}\n• Correo: ${email}\n• Área: ${projectType}\n\nMensaje:\n${message}`;
    return { name, email, projectType, message, formattedText };
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, projectType, formattedText } = buildPayload();

    const subject = encodeURIComponent(`Contacto Portafolio: ${projectType} - ${name}`);
    const body = encodeURIComponent(formattedText);

    window.location.href = `mailto:Socialedgar0710@gmail.com?subject=${subject}&body=${body}`;

    if (formStatusText) {
      formStatusText.textContent = t("form_status_mail");
    }
    formStatus.classList.remove("hidden");
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      if (!contactForm.reportValidity()) return;
      const { formattedText } = buildPayload();
      const waUrl = `https://wa.me/584129640005?text=${encodeURIComponent(formattedText)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      if (formStatusText) {
        formStatusText.textContent = t("form_status_wa");
      }
      formStatus.classList.remove("hidden");
    });
  }

  if (copyFormMsgBtn) {
    copyFormMsgBtn.addEventListener("click", async () => {
      const { formattedText } = buildPayload();
      try {
        await navigator.clipboard.writeText(formattedText);
        copyFormMsgBtn.textContent = t("copied_btn");
        setTimeout(() => {
          copyFormMsgBtn.textContent = "Copiar mensaje";
        }, 2000);
      } catch (err) {
        console.warn("[ClipboardService] Fallo al copiar el mensaje formateado:", err);
      }
    });
  }
}
