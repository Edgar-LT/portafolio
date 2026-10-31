/* ==========================================================================
   CONTROLADOR PRINCIPAL DEL PORTAFOLIO (js/main.js)
   Edgar López — Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
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
function renderProjectPreview(project) {
  if (project.image) {
    return `
      <div class="w-full h-48 rounded-lg overflow-hidden relative bg-surface-container-lowest mb-space-md border border-white/[0.06]">
        <img alt="${project.title}" width="640" height="360" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" src="${project.image}" />
      </div>
    `;
  }

  // Vista previa minimalista y limpia cuando aún no hay captura real
  return `
    <div class="w-full h-44 rounded-lg bg-surface-container-lowest bg-subtle-grid mb-space-md border border-white/[0.06] p-space-md flex flex-col justify-between relative overflow-hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span class="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span class="w-2 h-2 rounded-full bg-zinc-700"></span>
        </div>
        <span class="font-label-sm text-label-sm text-on-surface-variant">${project.categoryLabel}</span>
      </div>
      <div class="flex items-center gap-space-sm my-auto">
        <div class="w-10 h-10 rounded-lg bg-surface-container-high border border-white/[0.08] flex items-center justify-center text-primary">
          <span class="material-symbols-outlined text-xl" aria-hidden="true">${project.icon || "folder_code"}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-headline-sm text-body-md text-primary font-medium">${project.title}</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant">${project.role}</span>
        </div>
      </div>
      <div class="flex items-center justify-between text-xs text-outline font-label-sm">
        <span>Vista previa del proyecto</span>
        <span class="group-hover:text-primary transition-colors">Ver detalles →</span>
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
      const tagsHtml = project.tags
        .map(
          (tag) =>
            `<span class="px-2.5 py-1 rounded-md bg-surface-container-high border border-white/[0.06] font-label-sm text-label-sm text-on-surface-variant">${tag}</span>`
        )
        .join("");

      return `
        <article tabindex="0" role="button" aria-label="Ver detalles de ${project.title}" class="project-card animate-fade-in flex flex-col justify-between clean-card p-space-lg rounded-xl cursor-pointer group" data-project-id="${project.id}">
          <div>
            <div class="flex items-center justify-between pb-space-sm">
              <span class="font-label-sm text-label-sm text-on-surface-variant">${project.categoryLabel}</span>
              <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-white/[0.07] font-label-sm text-label-sm text-on-surface-variant">${project.status}</span>
            </div>

            ${renderProjectPreview(project)}

            <div class="flex flex-col gap-space-xs">
              <h3 class="font-headline-md text-headline-md text-primary group-hover:text-white transition-colors">${project.title}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                ${project.shortDescription}
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 py-space-md">
              ${tagsHtml}
            </div>

            <div class="flex items-center justify-between pt-space-sm border-t border-white/[0.06]">
              <span class="font-body-sm text-body-sm text-primary font-medium group-hover:underline flex items-center gap-1">
                <span>Ficha del proyecto</span>
                <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_outward</span>
              </span>
              <div class="flex items-center gap-space-md" onclick="event.stopPropagation()">
                <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Código en GitHub de ${project.title}">
                  <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
                  <span>Código</span>
                </a>
                <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors" href="${project.demoUrl}" aria-label="Demo de ${project.title}">
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
          "filter-btn px-3.5 py-1.5 rounded-lg font-body-sm text-body-sm bg-surface-container text-on-surface-variant hover:text-primary border border-white/[0.07] transition-all";
      });
      btn.setAttribute("aria-pressed", "true");
      btn.className =
        "filter-btn px-3.5 py-1.5 rounded-lg font-body-sm text-body-sm bg-primary text-on-primary font-medium transition-all";

      renderProjects(projects, filter);
    });
  });
}

/* ==========================================================================
   2. RENDERIZADO DINÁMICO DE STACK TECNOLÓGICO (CHIPS LIMPIOS)
   ========================================================================== */
function initSkills(categories) {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = categories
    .map((cat) => {
      const skillsHtml = (cat.skills || [])
        .map(
          (skill) => `
          <span class="px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/[0.07] font-body-sm text-body-sm text-on-surface hover:border-white/20 transition-colors">
            ${skill}
          </span>
        `
        )
        .join("");

      return `
        <div class="clean-card p-space-lg rounded-xl flex flex-col gap-space-md">
          <div class="flex items-start justify-between gap-space-sm">
            <div class="flex flex-col gap-1">
              <h3 class="font-headline-sm text-headline-sm text-primary">${cat.title}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">${cat.description || ""}</p>
            </div>
            <div class="w-9 h-9 rounded-lg bg-surface-container-high border border-white/[0.07] flex items-center justify-center text-on-surface-variant shrink-0">
              <span class="material-symbols-outlined text-lg" aria-hidden="true">${cat.icon}</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 pt-space-xs">
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
    .map(
      (item) => `
      <div class="clean-card p-space-lg rounded-xl flex flex-col gap-space-xs">
        <div class="flex flex-wrap items-center justify-between gap-space-xs">
          <span class="font-label-sm text-label-sm text-on-surface-variant">${item.period}</span>
          <span class="px-2.5 py-0.5 rounded-full bg-surface-container-high border border-white/[0.08] font-label-sm text-label-sm text-on-surface">${item.badge}</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-primary pt-1">${item.title}</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          ${item.description}
        </p>
      </div>
    `
    )
    .join("");
}

/* ==========================================================================
   4. MODAL DE DETALLES DE PROYECTO (LIMPIO Y SOBRIO)
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

    const tagsHtml = project.tags
      .map(
        (tag) =>
          `<span class="px-3 py-1 rounded-md bg-surface-container-high border border-white/[0.08] font-label-sm text-label-sm text-on-surface">${tag}</span>`
      )
      .join("");

    const featuresHtml = (project.features || [])
      .map(
        (feat) => `
        <li class="flex items-start gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
          <span class="material-symbols-outlined text-primary text-base mt-0.5" aria-hidden="true">check</span>
          <span>${feat}</span>
        </li>
      `
      )
      .join("");

    const imageBlock = project.image
      ? `<div class="w-full h-64 rounded-xl overflow-hidden border border-white/10 bg-surface-container-lowest">
           <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
         </div>`
      : "";

    modalContent.innerHTML = `
      <div class="flex flex-col gap-space-lg">
        <!-- Encabezado -->
        <div class="flex flex-col gap-space-xs border-b border-white/[0.08] pb-space-md pr-10">
          <div class="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
            <span>${project.categoryLabel}</span>
            <span>·</span>
            <span>${project.role}</span>
            <span>·</span>
            <span class="text-on-surface">${project.status}</span>
          </div>
          <h3 id="modal-project-title" class="font-headline-lg-mobile text-primary">${project.title}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${project.shortDescription}</p>
          <div class="flex flex-wrap gap-1.5 pt-2">
            ${tagsHtml}
          </div>
        </div>

        ${imageBlock}

        <!-- Problema & Arquitectura -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div class="bg-surface-container-lowest border border-white/[0.07] p-space-md rounded-xl flex flex-col gap-1.5">
            <h4 class="font-headline-sm text-body-md font-semibold text-primary">El Reto</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${project.problem}</p>
          </div>

          <div class="bg-surface-container-lowest border border-white/[0.07] p-space-md rounded-xl flex flex-col gap-1.5">
            <h4 class="font-headline-sm text-body-md font-semibold text-primary">Solución & Arquitectura</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${project.architecture}</p>
          </div>
        </div>

        <!-- Características Clave -->
        <div class="bg-surface-container-lowest border border-white/[0.07] p-space-md rounded-xl flex flex-col gap-space-sm">
          <h4 class="font-headline-sm text-body-md font-semibold text-primary">Aspectos Destacados</h4>
          <ul class="grid grid-cols-1 gap-2">
            ${featuresHtml}
          </ul>
        </div>

        <!-- Botones de Acción -->
        <div class="flex flex-wrap items-center justify-end gap-space-sm pt-space-sm border-t border-white/[0.08]">
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-body-sm text-body-sm px-4 py-2 rounded-lg bg-surface-container-high border border-white/10 text-on-surface hover:border-white/25 transition-all">
            <span class="material-symbols-outlined text-base" aria-hidden="true">code</span>
            <span>Ver repositorio en GitHub</span>
          </a>
          <a href="${project.demoUrl}" class="inline-flex items-center gap-2 font-body-sm text-body-sm font-medium px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-zinc-200 transition-all">
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
          "nav-link font-body-sm text-body-sm px-3 py-1.5 rounded-lg bg-surface-container-high text-primary font-medium transition-all";
      } else {
        link.removeAttribute("aria-current");
        link.className =
          "nav-link font-body-sm text-body-sm px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-primary transition-all";
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
