with open('js/main.js', 'r', encoding='utf-8') as f:
    text = f.read()

is_crlf = '\r\n' in text
content = text.replace('\r\n', '\n')

old_runner = """document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  initTheme();
  initLanguage(data);
  initProjects(data.projects);
  initSkills(data.skillCategories);
  initTimeline(data.timeline);
  initMobileMenu();
  initScrollSpy();
  initProjectModal(data.projects);
  initGithubTelemetry(data.profile?.githubUser || "Edgar-LT");
  initContactForm();
});"""

new_runner = """function bootstrapPortfolio() {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.warn("[Portfolio] PORTFOLIO_DATA no disponible todavia, reintentando en 50ms...");
    setTimeout(bootstrapPortfolio, 50);
    return;
  }

  try {
    initTheme();
    initLanguage(data);
    initProjects(data.projects);
    initSkills(data.skillCategories);
    initTimeline(data.timeline);
    initMobileMenu();
    initScrollSpy();
    initProjectModal(data.projects);
    initGithubTelemetry(data.profile?.githubUser || "Edgar-LT");
    initContactForm();
  } catch (err) {
    console.error("[Portfolio] Error inicializando modulos:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapPortfolio);
} else {
  bootstrapPortfolio();
}"""

assert old_runner in content, "old_runner not found"
content = content.replace(old_runner, new_runner, 1)

if is_crlf:
    content = content.replace('\n', '\r\n')

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("bootstrapPortfolio replaced cleanly.")
