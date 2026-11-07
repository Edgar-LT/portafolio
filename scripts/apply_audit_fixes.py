import re

with open('js/main.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Normalize CRLF to LF for consistent matching
is_crlf = '\r\n' in text
content = text.replace('\r\n', '\n')

# 1. Add escapeHtml function
target_fn = """let currentLang = localStorage.getItem("edgar_lang") === "en" ? "en" : "es";
let currentProjectFilter = "all";
let cachedGithubRepos = null;

function t(key) {"""

repl_fn = """let currentLang = localStorage.getItem("edgar_lang") === "en" ? "en" : "es";
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

function t(key) {"""

assert target_fn in content, "target_fn not found"
content = content.replace(target_fn, repl_fn, 1)

# 2. XSS & Defensive check in renderProjectPreview
target_prev = """function renderProjectPreview(project, styles) {
  const title = currentLang === "en" && project.titleEn ? project.titleEn : project.title;
  const categoryLabel =
    currentLang === "en" && project.categoryLabelEn ? project.categoryLabelEn : project.categoryLabel;
  const role = currentLang === "en" && project.roleEn ? project.roleEn : project.role;
  const status = currentLang === "en" && project.statusEn ? project.statusEn : project.status;"""

repl_prev = """function renderProjectPreview(project, styles) {
  const rawTitle = currentLang === "en" && project.titleEn ? project.titleEn : project.title;
  const rawCategoryLabel =
    currentLang === "en" && project.categoryLabelEn ? project.categoryLabelEn : project.categoryLabel;
  const rawRole = currentLang === "en" && project.roleEn ? project.roleEn : project.role;
  const rawStatus = currentLang === "en" && project.statusEn ? project.statusEn : project.status;

  const title = escapeHtml(rawTitle);
  const categoryLabel = escapeHtml(rawCategoryLabel);
  const role = escapeHtml(rawRole);
  const status = escapeHtml(rawStatus);"""

assert target_prev in content, "target_prev not found"
content = content.replace(target_prev, repl_prev, 1)

# 3. Defensive rendering and sanitization in renderProjects
target_proj = """      const tagsHtml = (project.tags || [])
        .map(
          (tag) =>
            `<span class="px-2.5 py-1 rounded-md identity-chip font-mono text-xs font-medium">${tag}</span>`
        )
        .join("");"""

repl_proj = """      const safeTags = Array.isArray(project.tags) ? project.tags : [];
      const tagsHtml = safeTags
        .map(
          (tag) =>
            `<span class="px-2.5 py-1 rounded-md identity-chip font-mono text-xs font-medium">${escapeHtml(tag)}</span>`
        )
        .join("");"""

assert target_proj in content, "target_proj not found"
content = content.replace(target_proj, repl_proj, 1)

# 4. Defensive rendering and sanitization in modal
target_modal = """    const metricsHtml =
      project.metrics && project.metrics.length
        ? `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${project.metrics
            .map(
              (m) => `
              <div class="identity-subcard p-3 rounded-xl flex flex-col">
                <span class="font-mono text-[11px] theme-muted">${m.label}</span>
                <span class="font-mono font-bold text-sm theme-heading">${m.value}</span>
              </div>
            `
            )
            .join("")}
        </div>
      `
        : "";

    const featuresHtml = features
      .map(
        (feat) => `
        <li class="flex items-start gap-2.5 text-sm theme-body">
          <span class="material-symbols-outlined theme-accent text-lg mt-0.5" aria-hidden="true">check_circle</span>
          <span>${feat}</span>
        </li>
      `
      )
      .join("");"""

repl_modal = """    const safeMetrics = Array.isArray(project.metrics) ? project.metrics : [];
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
      .join("");"""

assert target_modal in content, "target_modal not found"
content = content.replace(target_modal, repl_modal, 1)

# 5. Blindaje XSS en GitHub telemetry (renderGithubRepos)
target_gh = """  container.innerHTML = topRepos
    .map((repo) => {
      const lang = repo.language || "Code";
      const desc =
        repo.description ||
        (currentLang === "en"
          ? "Public source code repository on GitHub."
          : "Repositorio público de código en GitHub.");

      return `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="identity-subcard p-4 rounded-xl flex flex-col justify-between gap-2.5 hover:border-blue-500 transition-all group">
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono font-bold text-xs sm:text-sm theme-heading group-hover:underline truncate">${repo.name}</span>
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
    .join("");"""

repl_gh = """  container.innerHTML = topRepos
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
    .join("");"""

assert target_gh in content, "target_gh not found"
content = content.replace(target_gh, repl_gh, 1)

# 6. Erradicar catch silenciosos
target_catch1 = """  } catch (_err) {
    cachedGithubRepos = FALLBACK_GITHUB_REPOS;
    renderGithubRepos(cachedGithubRepos);
  }"""

repl_catch1 = """  } catch (err) {
    console.warn("[GitHubTelemetry] Error consultando API de GitHub, aplicando fallback seguro:", err);
    cachedGithubRepos = FALLBACK_GITHUB_REPOS;
    renderGithubRepos(cachedGithubRepos);
  }"""

assert target_catch1 in content, "target_catch1 not found"
content = content.replace(target_catch1, repl_catch1, 1)

target_catch2 = """      } catch (_e) {
        window.location.href = "mailto:Socialedgar0710@gmail.com";
      }"""

repl_catch2 = """      } catch (err) {
        console.warn("[ClipboardService] Acceso al portapapeles denegado, redirigiendo a cliente nativo de correo:", err);
        window.location.href = "mailto:Socialedgar0710@gmail.com";
      }"""

assert target_catch2 in content, "target_catch2 not found"
content = content.replace(target_catch2, repl_catch2, 1)

target_catch3 = """      } catch (_e) {
        // Fallback silencioso
      }"""

repl_catch3 = """      } catch (err) {
        console.warn("[ClipboardService] Fallo al copiar el mensaje formateado:", err);
      }"""

assert target_catch3 in content, "target_catch3 not found"
content = content.replace(target_catch3, repl_catch3, 1)

if is_crlf:
    content = content.replace('\n', '\r\n')

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("P0, P1, P2 refactoring applied cleanly to js/main.js")
