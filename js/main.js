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
   0. GESTIÓN DE TEMA (CLARO LUMINOSO / AZUL NOCHE)
   ========================================================================== */
function initTheme() {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-toggle-icon");
  const themeLabel = document.getElementById("theme-toggle-label");

  const savedTheme = localStorage.getItem("edgar_theme");
  if (savedTheme === "dark") {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }

  function syncThemeUI() {
    const isDark = htmlEl.classList.contains("dark");
    if (themeIcon) {
      themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
    }
    if (themeLabel) {
      themeLabel.textContent = isDark ? "Claro" : "Oscuro";
    }
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(isDark));
    }
  }

  syncThemeUI();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = htmlEl.classList.toggle("dark");
      localStorage.setItem("edgar_theme", isDark ? "dark" : "light");
      syncThemeUI();
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
        badge: "bg-teal-600 text-white",
        iconBox: "bg-teal-600 text-white shadow-sm",
        topBar: "bg-teal-600",
        linkText: "text-teal-600 dark:text-teal-400"
      };
    default:
      return {
        badge: "bg-blue-600 text-white",
        iconBox: "bg-blue-600 text-white shadow-sm",
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
      <div class="w-full h-48 rounded-xl overflow-hidden relative mb-4 identity-subcard">
        <img alt="Captura de ${project.title}" width="640" height="360" loading="lazy" decoding="async" class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300" src="${project.image}" />
        <span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${styles.badge}">${project.categoryLabel}</span>
      </div>
    `;
  }

  return `
    <div class="w-full h-44 rounded-xl identity-subcard bg-blueprint mb-4 p-5 flex flex-col justify-between relative overflow-hidden">
      <div class="flex items-center justify-end">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.badge}">${project.categoryLabel}</span>
      </div>
      <div class="flex items-center gap-3.5 my-auto">
        <div class="w-11 h-11 rounded-xl ${styles.iconBox} flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">${project.icon || "folder_code"}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-display font-bold text-base theme-heading">${project.title}</span>
          <span class="font-mono text-xs theme-muted">${project.role}</span>
        </div>
      </div>
      <div class="flex items-center justify-between text-xs font-semibold theme-muted">
        <span>Estado: ${project.status}</span>
        <span class="theme-accent group-hover:translate-x-0.5 transition-transform">Ver detalles →</span>
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
            `<span class="px-2.5 py-1 rounded-md identity-chip font-mono text-xs font-medium">${tag}</span>`
        )
        .join("");

      return `
        <article tabindex="0" role="button" aria-label="Ver detalles de ${project.title}" class="project-card animate-fade-in flex flex-col justify-between identity-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden" data-project-id="${project.id}">
          <div class="absolute top-0 left-0 right-0 h-1.5 ${styles.topBar}"></div>
          <div>
            ${renderProjectPreview(project, styles)}

            <div class="flex flex-col gap-1.5">
              <h3 class="font-display font-bold text-xl theme-heading">${project.title}</h3>
              <p class="text-sm leading-relaxed theme-body">
                ${project.shortDescription}
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 py-4">
              ${tagsHtml}
            </div>

            <div class="flex items-center justify-between pt-3 border-t theme-border">
              <span class="text-sm font-semibold theme-accent flex items-center gap-1">
                <span>Ficha del proyecto</span>
                <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_outward</span>
              </span>
              <div class="flex items-center gap-4" onclick="event.stopPropagation()">
                <a class="text-sm font-semibold theme-body hover:underline flex items-center gap-1" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Código en GitHub de ${project.title}">
                  <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
                  <span>Código</span>
                </a>
                <a class="text-sm font-semibold theme-body hover:underline flex items-center gap-1" href="${project.demoUrl}" aria-label="Demo de ${project.title}">
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
          "filter-btn px-4 py-2 rounded-xl text-sm font-medium identity-btn-secondary transition-all";
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
              <h3 class="font-display font-bold text-lg theme-heading">${cat.title}</h3>
              <p class="text-sm theme-muted">${cat.description || ""}</p>
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
            <span class="font-mono text-xs font-semibold theme-muted">${item.period}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.badge}">${item.badge}</span>
          </div>
          <h3 class="font-display font-bold text-lg theme-heading pl-2">${item.title}</h3>
          <p class="text-sm leading-relaxed theme-body pl-2">
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
          `<span class="px-3 py-1 rounded-md identity-chip font-mono text-xs font-medium">${tag}</span>`
      )
      .join("");

    const featuresHtml = (project.features || [])
      .map(
        (feat) => `
        <li class="flex items-start gap-2.5 text-sm theme-body">
          <span class="material-symbols-outlined theme-accent text-lg mt-0.5" aria-hidden="true">check_circle</span>
          <span>${feat}</span>
        </li>
      `
      )
      .join("");

    const modalImageHtml = project.image
      ? `
        <div class="w-full max-h-64 rounded-xl overflow-hidden identity-subcard">
          <img src="${project.image}" alt="Vista de ${project.title}" class="w-full h-full object-cover object-top" loading="lazy" />
        </div>
      `
      : "";

    modalContent.innerHTML = `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2 border-b theme-border pb-4 pr-10">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.badge}">${project.categoryLabel}</span>
            <span class="text-xs font-mono theme-muted">${project.role} · ${project.status}</span>
          </div>
          <h3 id="modal-project-title" class="font-display font-bold text-2xl theme-heading">${project.title}</h3>
          <p class="text-sm theme-body">${project.shortDescription}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${tagsHtml}
          </div>
        </div>

        ${modalImageHtml}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="identity-subcard p-4 rounded-xl flex flex-col gap-1.5">
            <h4 class="font-display font-bold text-sm theme-heading">El Reto</h4>
            <p class="text-sm theme-body">${project.problem}</p>
          </div>

          <div class="identity-subcard p-4 rounded-xl flex flex-col gap-1.5">
            <h4 class="font-display font-bold text-sm theme-heading">Solución & Arquitectura</h4>
            <p class="text-sm theme-body">${project.architecture}</p>
          </div>
        </div>

        <div class="identity-subcard p-4 rounded-xl flex flex-col gap-2.5">
          <h4 class="font-display font-bold text-sm theme-heading">Aspectos Destacados</h4>
          <ul class="grid grid-cols-1 gap-2">
            ${featuresHtml}
          </ul>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-3 pt-3 border-t theme-border">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl identity-btn-secondary transition-all">
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
          "nav-link text-sm px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold transition-all";
      } else {
        link.removeAttribute("aria-current");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-lg theme-body hover:underline transition-all";
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
