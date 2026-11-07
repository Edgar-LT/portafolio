with open('js/main.js', 'r', encoding='utf-8') as f:
    text = f.read()

is_crlf = '\r\n' in text
content = text.replace('\r\n', '\n')

old_spy = """function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
  let ticking = false;

  function updateActiveNav() {
    let currentSection = "inicio";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.setAttribute("aria-current", "page");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-full nav-pill-active font-semibold transition-all";
      } else {
        link.removeAttribute("aria-current");
        link.className =
          "nav-link text-sm px-3.5 py-1.5 rounded-full theme-body hover:underline transition-all";
      }
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveNav);
        ticking = true;
      }
    },
    { passive: true }
  );
}"""

new_spy = """function initScrollSpy() {
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
}"""

assert old_spy in content, "old_spy not found"
content = content.replace(old_spy, new_spy, 1)

if is_crlf:
    content = content.replace('\n', '\r\n')

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("initScrollSpy successfully refactored with IntersectionObserver.")
