# Edgar López // Portafolio Profesional

![Estado del Despliegue](https://img.shields.io/badge/GitHub%20Pages-Activo-01e599?style=flat-square&logo=github)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Modular%20Data--Driven-00f0ff?style=flat-square)
![Estándar](https://img.shields.io/badge/WCAG%202.1%20AA-%26%20SEO%20Ready-7bd0ff?style=flat-square)

Portafolio web profesional de **Edgar López** — Estudiante de **Ingeniería Mecatrónica** y **Desarrollador Web y de Aplicaciones** en Caracas, Venezuela.

- 🌐 **Portafolio en Vivo:** [https://edgar-lt.github.io/portafolio/](https://edgar-lt.github.io/portafolio/)
- 📄 **Currículum Vitae (Imprimible / PDF):** [https://edgar-lt.github.io/portafolio/cv.html](https://edgar-lt.github.io/portafolio/cv.html)

---

## 🚀 Enfoque: La Tríada Tecnológica
1. **Ingeniería Mecatrónica & Sistemas Embebidos:** Integración de electrónica, sensores, actuadores, control y automatización.
2. **Desarrollo Web Full-Stack:** Interfaces web modernas, responsivas y orientadas al rendimiento.
3. **Desarrollo de Aplicaciones:** Soluciones móviles y multiplataforma conectadas.

---

## 🏗️ Arquitectura Modular del Proyecto

El código sigue una arquitectura **Data-Driven** con separación de responsabilidades, optimización SEO/Accesibilidad (WCAG 2.1 AA) y despliegue continuo en **GitHub Pages**:

```text
portafolio/
├── index.html             # Estructura semántica HTML5, JSON-LD Schema.org, SEO & Open Graph
├── cv.html                # Hoja de vida técnica conectada a data.js e imprimible en PDF
├── css/
│   └── styles.css         # Estilos Kinetic Precision (glassmorphism, foco accesible, animaciones)
├── js/
│   ├── config.tailwind.js # Tokens de diseño (colores, tipografía, espaciados)
│   ├── data.js            # Fuente única de datos (Proyectos, Stack y Trayectoria)
│   └── main.js            # Renderizado dinámico, filtros, Modal de Ficha Técnica y eventos
├── scripts/
│   └── verify.ps1         # Script de auditoría e integridad de archivos antes de desplegar
├── assets/                # Monogramas SVG vectoriales e imágenes de proyectos
├── robots.txt             # Directivas de indexación para buscadores
├── sitemap.xml            # Mapa del sitio XML para SEO
├── site.webmanifest       # Manifiesto de aplicación web
└── DESIGN.md              # Especificación completa del sistema de diseño Kinetic Precision
```

---

## 🛠️ Guía Rápida: Cómo Agregar o Actualizar Proyectos y Lenguajes

Toda la información de proyectos, lenguajes y trayectoria está centralizada en [`js/data.js`](./js/data.js). Tanto `index.html` como `cv.html` se actualizan automáticamente al editar ese archivo:

1. **Agregar o editar un Proyecto (`window.PORTFOLIO_DATA.projects`):**
   - Define `title`, `shortDescription`, `categories` (`["web"]`, `["app"]`, `["mecatronica"]`), `image` y los detalles para el **Modal de Ficha Técnica** (`problem`, `architecture`, `features`, `tags`, `repoUrl`, `demoUrl`).
2. **Actualizar Lenguajes y Habilidades (`window.PORTFOLIO_DATA.skillCategories`):**
   - Modifica o añade tecnologías indicando `name`, `level` (`"Avanzado"`, `"Intermedio"`, `"En Formación"`) y `progress` (`0–100`).
3. **Actualizar Trayectoria (`window.PORTFOLIO_DATA.timeline`):**
   - Agrega nuevos hitos académicos, certificaciones o experiencias profesionales.

---

## 📬 Contacto Directo
- **Correo:** [Socialedgar0710@gmail.com](mailto:Socialedgar0710@gmail.com)
- **GitHub:** [github.com/Edgar-LT](https://github.com/Edgar-LT)
- **WhatsApp:** [+58 412-9640005](https://wa.me/584129640005)
