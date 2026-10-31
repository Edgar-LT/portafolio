/* ==========================================================================
   CONTROLADOR PRINCIPAL DEL PORTAFOLIO (js/main.js)
   Edgar López // Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
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
   1. RENDERIZADO DINÁMICO Y FILTRADO DE PROYECTOS
   ========================================================================== */
function getTagStyle(highlight) {
  switch (highlight) {
    case "primary":
      return "border-primary-container/30 text-primary-container";
    case "secondary":
      return "border-secondary-fixed/30 text-secondary-fixed";
    case "tertiary":
      return "border-tertiary-fixed-dim/30 text-tertiary-fixed-dim";
    default:
      return "border-white/[0.08] text-on-surface";
  }
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
      const tagsHtml = project.tags
        .map(
          (tag) =>
            `<span class="px-space-sm py-0.5 rounded bg-surface-container-highest border ${getTagStyle(
              tag.highlight
            )} font-label-sm text-label-sm">${tag.name}</span>`
        )
        .join("");

      return `
        <article class="project-card animate-fade-in flex flex-col justify-between glass-card p-space-lg rounded-xl cursor-pointer group" data-project-id="${project.id}">
          <div>
            <div class="flex items-center justify-between pb-space-sm font-label-sm text-label-sm">
              <span class="text-secondary-fixed">${project.code}</span>
              <span class="px-space-sm py-0.5 rounded bg-surface-container-high border border-white/10 text-on-surface">${project.status}</span>
            </div>

            <!-- Imagen del Proyecto -->
            <div class="w-full h-56 rounded-lg overflow-hidden relative bg-surface-container-lowest my-space-sm border border-white/[0.08]">
              <img alt="${project.title}" loading="lazy" class="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" src="${project.image}" />
              <div class="absolute bottom-2 right-2 bg-surface/90 backdrop-blur px-space-sm py-0.5 rounded border ${project.badgeStyle} font-label-sm text-label-sm">
                ${project.badgeText}
              </div>
            </div>

            <!-- Título y Descripción -->
            <div class="flex flex-col gap-space-xs pt-space-xs">
              <h3 class="font-headline-md text-headline-md text-primary group-hover:text-primary-container transition-colors">${project.title}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                ${project.shortDescription}
              </p>
            </div>
          </div>

          <div>
            <!-- Lenguajes y Tecnologías -->
            <div class="flex flex-wrap gap-space-xs py-space-md">
              ${tagsHtml}
            </div>

            <!-- Acciones y Ficha Técnica -->
            <div class="flex items-center justify-between pt-space-sm border-t border-white/[0.06]">
              <button type="button" class="open-modal-btn font-label-sm text-label-sm text-primary-container hover:text-primary flex items-center gap-1" data-project-id="${project.id}">
                <span>[ ver_ficha_técnica ]</span>
                <span class="material-symbols-outlined text-sm">visibility</span>
              </button>
              <div class="flex items-center gap-space-sm" onclick="event.stopPropagation()">
                <a class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary-container flex items-center gap-1 transition-colors" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">
                  <span>[ repo.git ]</span>
                  <span class="material-symbols-outlined text-sm">code</span>
                </a>
                <a class="font-label-sm text-label-sm text-secondary-fixed hover:text-primary flex items-center gap-1 transition-colors" href="${project.demoUrl}">
                  <span>${project.demoLabel}</span>
                  <span class="material-symbols-outlined text-sm">open_in_new</span>
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
        b.className =
          "filter-btn px-space-md py-space-xs rounded-lg font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/[0.08] transition-all";
      });
      btn.className =
        "filter-btn px-space-md py-space-xs rounded-lg font-label-sm text-label-sm bg-primary-container text-on-primary-container font-semibold transition-all";

      renderProjects(projects, filter);
    });
  });
}

/* ==========================================================================
   2. RENDERIZADO DINÁMICO DE STACK TECNOLÓGICO & HABILIDADES
   ========================================================================== */
function initSkills(categories) {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = categories
    .map((cat) => {
      const itemsHtml = cat.items
        .map(
          (item) => `
          <div class="flex flex-col gap-1">
            <div class="flex justify-between items-center font-label-sm text-label-sm text-on-surface gap-2">
              <span class="truncate">${item.name}</span>
              <span class="${cat.accentText} shrink-0 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-container-high border border-white/[0.06]">${item.level}</span>
            </div>
            <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div class="h-full ${cat.barColor} rounded-full transition-all duration-700" style="width: ${item.progress}%;"></div>
            </div>
          </div>
        `
        )
        .join("");

      return `
        <div class="glass-card p-space-md rounded-xl flex flex-col gap-space-sm">
          <div class="flex items-center justify-between pb-space-xs border-b border-white/[0.06]">
            <span class="font-label-sm text-label-sm ${cat.accentText} uppercase">${cat.title}</span>
            <span class="material-symbols-outlined ${cat.accentText} text-sm">${cat.icon}</span>
          </div>
          <div class="flex flex-col gap-space-sm pt-space-xs">
            ${itemsHtml}
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
    .map(
      (item) => `
      <div class="glass-card p-space-md rounded-xl flex flex-col gap-space-xs">
        <div class="flex flex-wrap items-center justify-between gap-space-xs font-label-sm text-label-sm">
          <span class="${item.periodColor} font-semibold">${item.period}</span>
          <span class="px-space-sm py-0.5 rounded ${item.badgeStyle}">${item.badge}</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-primary">${item.title}</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          ${item.description}
        </p>
      </div>
    `
    )
    .join("");
}

/* ==========================================================================
   4. MODAL DE CASO DE ESTUDIO (FICHA TÉCNICA DE INGENIERÍA)
   ========================================================================== */
function initProjectModal(projects) {
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-body");
  const closeBtn = document.getElementById("close-modal-btn");
  const grid = document.getElementById("projects-grid");

  if (!modal || !modalContent || !grid) return;

  function openModal(projectId) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const tagsHtml = project.tags
      .map(
        (tag) =>
          `<span class="px-space-sm py-1 rounded bg-surface-container-highest border ${getTagStyle(
            tag.highlight
          )} font-label-sm text-label-sm">${tag.name}</span>`
      )
      .join("");

    const featuresHtml = (project.features || [])
      .map(
        (feat) => `
        <li class="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
          <span class="material-symbols-outlined text-secondary-fixed text-base mt-0.5">check_circle</span>
          <span>${feat}</span>
        </li>
      `
      )
      .join("");

    modalContent.innerHTML = `
      <div class="flex flex-col gap-space-lg">
        <!-- Encabezado Técnico -->
        <div class="flex flex-wrap items-center justify-between gap-space-sm border-b border-white/10 pb-space-sm">
          <div class="flex items-center gap-space-sm font-label-sm text-label-sm">
            <span class="text-secondary-fixed font-semibold">${project.code}</span>
            <span class="text-outline">//</span>
            <span class="px-space-sm py-0.5 rounded bg-surface-container-high border border-white/10 text-on-surface">${project.status}</span>
            <span class="px-space-sm py-0.5 rounded bg-surface-container-high border ${project.badgeStyle}">${project.badgeText}</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant">ROL: ${project.role}</span>
        </div>

        <!-- Imagen & Título -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div class="lg:col-span-6 w-full h-64 rounded-xl overflow-hidden border border-white/10 bg-surface-container-lowest">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
          </div>
          <div class="lg:col-span-6 flex flex-col gap-space-sm">
            <span class="font-label-sm text-label-sm text-primary-container uppercase">// FICHA TÉCNICA DE PROYECTO</span>
            <h3 class="font-headline-lg-mobile text-primary">${project.title}</h3>
            <p class="font-body-md text-body-md text-on-surface-variant">${project.shortDescription}</p>
            <div class="flex flex-wrap gap-space-xs pt-space-xs">
              ${tagsHtml}
            </div>
          </div>
        </div>

        <!-- Problema & Arquitectura -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div class="bg-surface-container-low border border-white/[0.08] p-space-md rounded-xl flex flex-col gap-space-xs">
            <div class="flex items-center gap-space-xs font-label-sm text-label-sm text-primary-container uppercase">
              <span class="material-symbols-outlined text-base">flag</span>
              <span>01 // El Problema & Reto</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${project.problem}</p>
          </div>

          <div class="bg-surface-container-low border border-white/[0.08] p-space-md rounded-xl flex flex-col gap-space-xs">
            <div class="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-fixed uppercase">
              <span class="material-symbols-outlined text-base">account_tree</span>
              <span>02 // Arquitectura & Solución</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${project.architecture}</p>
          </div>
        </div>

        <!-- Características Clave -->
        <div class="bg-surface-container-low border border-white/[0.08] p-space-md rounded-xl flex flex-col gap-space-sm">
          <span class="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase">03 // Características & Especificaciones Clave</span>
          <ul class="grid grid-cols-1 gap-space-xs">
            ${featuresHtml}
          </ul>
        </div>

        <!-- Botones de Acción -->
        <div class="flex flex-wrap items-center justify-end gap-space-md pt-space-xs border-t border-white/10">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-space-xs font-label-md text-label-md px-space-lg py-space-sm rounded-lg bg-surface-container-high border border-white/15 text-on-surface hover:border-primary-container hover:text-primary-container transition-all">
            <span class="material-symbols-outlined text-sm">code</span>
            <span>Ver Código en GitHub</span>
          </a>
          <a href="${project.demoUrl}" class="inline-flex items-center gap-space-xs font-headline-sm text-body-sm font-semibold px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container hover:bg-primary-fixed shadow-[0_0_16px_rgba(0,240,255,0.25)] transition-all">
            <span>Abrir Demo / Vista Previa</span>
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (card) {
      openModal(card.getAttribute("data-project-id"));
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
    if (mobileMenuIcon) {
      mobileMenuIcon.textContent = isHidden ? "menu" : "close";
    }
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
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
        link.className =
          "nav-link font-label-md text-label-md px-space-sm py-space-xs rounded-lg bg-primary-container text-on-primary-container font-semibold transition-all";
      } else {
        link.className =
          "nav-link font-label-md text-label-md px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:text-on-surface transition-all";
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
      `Portafolio Web: ${projectType} - ${name}`
    );
    const body = encodeURIComponent(
      `Nombre / Empresa: ${name}\nCorreo: ${email}\nÁrea: ${projectType}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:Socialedgar0710@gmail.com?subject=${subject}&body=${body}`;

    formStatus.classList.remove("hidden");
    contactForm.reset();
  });
}
