/* ==========================================================================
   CONTROLADOR PRINCIPAL DEL PORTAFOLIO (js/main.js)
   Edgar López — Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  initProjects(data.projects);
  initSkills(data.skillCategories);
  initTimeline(data.timeline);
  initMobileMenu();
  initScrollSpy();
  initProjectModal(data.projects);
  initContactForm();
});

/* ==========================================================================
   0. GESTIÓN DE TEMA (CLARO LUMINOSO POR DEFECTO / AZUL PIZARRA OSCURO)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem("edgar_theme");
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-toggle-icon");

  if (savedTheme === "dark") {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }

  function updateIcon() {
    if (!themeIcon) return;
    const isDark = htmlEl.classList.contains("dark");
    themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
  }

  updateIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = htmlEl.classList.toggle("dark");
      localStorage.setItem("edgar_theme", isDark ? "dark" : "light");
      updateIcon();
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
        badge: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60",
        iconBox: "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20",
        banner: "from-indigo-600/15 via-indigo-500/5 to-transparent dark:from-indigo-500/20 dark:via-indigo-500/5 dark:to-transparent",
        topBar: "bg-indigo-600",
        linkText: "text-indigo-600 dark:text-indigo-400"
      };
    case "teal":
      return {
        badge: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800/60",
        iconBox: "bg-teal-600 text-white shadow-sm shadow-teal-500/20",
        banner: "from-teal-600/15 via-teal-500/5 to-transparent dark:from-teal-500/20 dark:via-teal-500/5 dark:to-transparent",
        topBar: "bg-teal-600",
        linkText: "text-teal-600 dark:text-teal-400"
      };
    default:
      return {
        badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60",
        iconBox: "bg-blue-600 text-white shadow-sm shadow-blue-500/20",
        banner: "from-blue-600/15 via-blue-500/5 to-transparent dark:from-blue-500/20 dark:via-blue-500/5 dark:to-transparent",
        topBar: "bg-blue-600",
        linkText: "text-blue-600 dark:text-blue-400"
      };
  }
}

/* ==========================================================================
   1. RENDERIZADO DINÁMICO Y FILTRADO DE PROYECTOS
   ========================================================================== */
function renderProjectPreview(project, styles) {
  if (project.image) {
    return `
      <div class="w-full h-48 rounded-xl overflow-hidden relative mb-4 border border-slate-200 dark:border-slate-700/70">
        <img alt="${project.title}" width="640" height="360" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" src="${project.image}" />
      </div>
    `;
  }

  return `
    <div class="w-full h-44 rounded-xl bg-gradient-to-br ${styles.banner} bg-blueprint mb-4 border border-slate-200/80 dark:border-slate-700/60 p-5 flex flex-col justify-between relative overflow-hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
        </div>
        <span class="px-2.5 py-0.5 rounded-full border text-xs font-medium ${styles.badge}">${project.categoryLabel}</span>
      </div>
      <div class="flex items-center gap-3.5 my-auto">
        <div class="w-11 h-11 rounded-xl ${styles.iconBox} flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">${project.icon || "folder_code"}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-display font-semibold text-base text-slate-900 dark:text-white">${project.title}</span>
          <span class="font-mono text-xs text-slate-500 dark:text-slate-400">${project.role}</span>
        </div>
      </div>
      <div class="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
        <span>Estado: ${project.status}</span>
        <span class="${styles.linkText} group-hover:translate-x-0.5 transition-transform">Ver detalles →</span>
      </div>
    </div>
  `;
}

function renderProjects(projects, activeFilter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  grid.innerHTML = filtered
    .map((project) => {
      const styles = getAccentClasses(project.accent);
      const tagsHtml = project.tags
        .map(
          (tag) =>
            `<span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300">${tag}</span>`
        )
        .join("");

      return `
        <article tabindex="0" role="button" aria-label="Ver detalles de ${project.title}" class="project-card animate-fade-in flex flex-col justify-between identity-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden" data-project-id="${project.id}">
          <div class="absolute top-0 left-0 right-0 h-1 ${styles.topBar}"></div>
          <div>
            ${renderProjectPreview(project, styles)}

            <div class="flex flex-col gap-1.5">
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${project.title}</h3>
              <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                ${project.shortDescription}
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 py-4">
              ${tagsHtml}
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-700/70">
              <span class="text-sm font-semibold ${styles.linkText} flex items-center gap-1">
                <span>Ficha del proyecto</span>
                <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_outward</span>
              </span>
              <div class="flex items-center gap-4" onclick="event.stopPropagation()">
                <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Código en GitHub de ${project.title}">
                  <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
                  <span>Código</span>
                </a>
                <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors" href="${project.demoUrl}" aria-label="Demo de ${project.title}">
                  <span class="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
                  <span>Demo</span>
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
  renderProjects(projects, "all");

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";

      filterBtns.forEach((b) => {
        b.setAttribute("aria-pressed", "false");
        b.className =
          "filter-btn px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-700 transition-all shadow-sm";
      });
      btn.setAttribute("aria-pressed", "true");
      btn.className =
        "filter-btn px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-md shadow-blue-600/20 transition-all";

      renderProjects(projects, filter);
    });
  });
}

/* ==========================================================================
   2. RENDERIZADO DINÁMICO DE STACK TECNOLÓGICO
   ========================================================================== */
function initSkills(categories) {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = categories
    .map((cat) => {
      const styles = getAccentClasses(cat.accent);
      const skillsHtml = (cat.skills || [])
        .map(
          (skill) => `
          <span class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-400 transition-colors">
            ${skill}
          </span>
        `
        )
        .join("");

      return `
        <div class="identity-card p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 ${styles.topBar}"></div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">${cat.title}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">${cat.description || ""}</p>
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

  container.innerHTML = timeline
    .map((item) => {
      const styles = getAccentClasses(item.accent);
      return `
        <div class="identity-card p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
          <div class="absolute top-0 bottom-0 left-0 w-1.5 ${styles.topBar}"></div>
          <div class="flex flex-wrap items-center justify-between gap-2 pl-2">
            <span class="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">${item.period}</span>
            <span class="px-2.5 py-0.5 rounded-full border text-xs font-semibold ${styles.badge}">${item.badge}</span>
          </div>
          <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white pl-2">${item.title}</h3>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300 pl-2">
            ${item.description}
          </p>
        </div>
      `;
    })
    .join("");
}

/* ==========================================================================
   4. MODAL DE DETALLES DE PROYECTO
   ========================================================================== */
function initProjectModal(projects) {
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-body");
  const closeBtn = document.getElementById("close-modal-btn");
  const grid = document.getElementById("projects-grid");
  let lastFocusedElement = null;

  if (!modal || !modalContent || !grid) return;

  function openModal(projectId, triggerEl) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    lastFocusedElement = triggerEl || document.activeElement;
    const styles = getAccentClasses(project.accent);

    const tagsHtml = project.tags
      .map(
        (tag) =>
          `<span class="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-200">${tag}</span>`
      )
      .join("");

    const featuresHtml = (project.features || [])
      .map(
        (feat) => `
        <li class="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg mt-0.5" aria-hidden="true">check_circle</span>
          <span>${feat}</span>
        </li>
      `
      )
      .join("");

    modalContent.innerHTML = `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2 border-b border-slate-200 dark:border-slate-700 pb-4 pr-10">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full border text-xs font-semibold ${styles.badge}">${project.categoryLabel}</span>
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400">${project.role} · ${project.status}</span>
          </div>
          <h3 id="modal-project-title" class="font-display font-bold text-2xl text-slate-900 dark:text-white">${project.title}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">${project.shortDescription}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${tagsHtml}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col gap-1.5">
            <h4 class="font-display font-bold text-sm text-slate-900 dark:text-white">El Reto</h4>
            <p class="text-sm text-slate-600 dark:text-slate-300">${project.problem}</p>
          </div>

          <div class="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col gap-1.5">
            <h4 class="font-display font-bold text-sm text-slate-900 dark:text-white">Solución & Arquitectura</h4>
            <p class="text-sm text-slate-600 dark:text-slate-300">${project.architecture}</p>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col gap-2.5">
          <h4 class="font-display font-bold text-sm text-slate-900 dark:text-white">Aspectos Destacados</h4>
          <ul class="grid grid-cols-1 gap-2">
            ${featuresHtml}
          </ul>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-all">
            <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
            <span>Ver repositorio en GitHub</span>
          </a>
          <a href="${project.demoUrl}" class="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all">
            <span>Abrir vista previa</span>
            <span class="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (card) {
      openModal(card.getAttribute("data-project-id"), card);
    }
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".project-card");
      if (card) {
        e.preventDefault();
        openModal(card.getAttribute("data-project-id"), card);
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. NAVEGACIÓN MÓVIL & SCROLL SPY
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

  window.addEventListener("scroll", () => {
    let currentSection = "inicio";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.setAttribute("aria-current", "page");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold transition-all";
      } else {
        link.removeAttribute("aria-current");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all";
      }
    });
  });
}

/* ==========================================================================
   6. FORMULARIO DE CONTACTO (ENVÍO POR CORREO ELECTRÓNICO)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (!contactForm || !formStatus) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const projectSelect = document.getElementById("project-type");
    const projectType =
      projectSelect?.options[projectSelect.selectedIndex]?.text || "";
    const message = document.getElementById("message")?.value || "";

    const subject = encodeURIComponent(
      `Contacto Portafolio: ${projectType} - ${name}`
    );
    const body = encodeURIComponent(
      `Nombre / Empresa: ${name}\nCorreo: ${email}\nÁrea: ${projectType}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:Socialedgar0710@gmail.com?subject=${subject}&body=${body}`;

    formStatus.classList.remove("hidden");
    contactForm.reset();
  });
}
