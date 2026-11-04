# Edgar López // Portafolio Profesional & Laboratorio Interactivo

![Estado del Despliegue](https://img.shields.io/badge/GitHub%20Pages-Activo-01e599?style=flat-square&logo=github)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Data--Driven%20SSOT-2563eb?style=flat-square)
![Idiomas](https://img.shields.io/badge/Idiomas-ES%20%7C%20EN-4f46e5?style=flat-square)
![Estándar](https://img.shields.io/badge/WCAG%202.1%20AA-%26%20SEO%20Ready-0d9488?style=flat-square)

Portafolio web profesional de **Edgar López** — Estudiante de **Ingeniería Mecatrónica** y **Desarrollador Web y de Aplicaciones** en Caracas, Venezuela.

- 🌐 **Portafolio en Vivo:** [https://edgar-lt.github.io/portafolio/](https://edgar-lt.github.io/portafolio/)
- 📄 **Currículum Vitae (Imprimible / PDF Bilingüe):** [https://edgar-lt.github.io/portafolio/cv.html](https://edgar-lt.github.io/portafolio/cv.html)

---

## 🚀 Enfoque: La Tríada Tecnológica
1. **Desarrollo Web Full-Stack:** Interfaces web modernas, responsivas, accesibles (WCAG 2.1 AA) y orientadas al rendimiento.
2. **Aplicaciones & Python:** Soluciones multiplataforma, backends con FastAPI, procesamiento documental (PyMuPDF / PDF.js) y síntesis neuronal (Edge-TTS).
3. **Ingeniería Mecatrónica & Control:** Integración de electrónica, sensores, actuadores, control clásico (PID) y telemetría en tiempo real.

---

## ✨ Características Principales del Proyecto

- **Mini Preview Interactivo de VoxPDF Studio (`#preview-voxpdf`):** Demostración interactiva en cliente de la interfaz de lectura con vista dividida (PDF + Guion), filtrado geométrico de encabezados/pies y reproductor con síntesis de voz (`SpeechSynthesis` / Neural TTS) y resaltado activo oración por oración.
- **Simulador Interactivo de Control PID (`#laboratorio-pid`):** Osciloscopio digital a 60 FPS en HTML5 Canvas para sintonizar ganancias ($K_p$, $K_i$, $K_d$) y Setpoint sobre un actuador electromecánico de 2.º orden, con inyección de perturbaciones de carga y cálculo en vivo de Sobreimpulso ($M_p\%$), Tiempo de Establecimiento ($T_s$), Error Estacionario ($e_{ss}$) y esfuerzo PWM.
- **Internacionalización Instantánea (`ES | EN`):** Conmutador de idioma con persistencia en `localStorage` que traduce tanto el portafolio principal como el Currículum Vitae imprimible (`cv.html`).
- **Sincronización en Vivo con GitHub API:** Panel de telemetría conectado a `api.github.com/users/Edgar-LT/repos` con caché en `sessionStorage` y respaldo offline automático.
- **Formulario de Contacto Dual:** Permite enviar consultas estructuradas directamente por **WhatsApp**, por **Correo Electrónico** o copiar el mensaje formateado con un clic sin pérdida de datos.

---

## 🏗️ Arquitectura Modular del Proyecto

```text
portafolio/
├── index.html                      # SPA semántica HTML5, Laboratorio PID, JSON-LD & Open Graph
├── cv.html                         # Motor de CV bilingüe (ES/EN) optimizado para exportar a PDF
├── css/
│   └── styles.css                  # Sistema de temas de alto contraste (Claro / Azul Noche) y @media print
├── js/
│   ├── config.tailwind.js          # Tokens de diseño unificados (colores, tipografía, espaciados)
│   ├── data.js                     # Fuente única de datos (SSOT) bilingüe para Proyectos, Stack y CV
│   └── main.js                     # Controlador principal, i18n, Modal accesible, Simulador PID y GitHub API
├── scripts/
│   └── verify.ps1                  # Auditoría automatizada de archivos, activos, SEO y calidad de datos
├── assets/
│   ├── favicon.svg                 # Icono vectorial de marca
│   ├── logo.svg                    # Monograma vectorial EL
│   ├── og-preview.svg              # Imagen Open Graph / Social Card (1200x630)
│   └── projects/                   # Vistas previas técnicas de cada proyecto
├── robots.txt                      # Directivas de indexación para motores de búsqueda
├── sitemap.xml                     # Mapa del sitio XML para SEO
├── site.webmanifest                # Manifiesto de aplicación web
└── DESIGN.md                       # Especificación del sistema de diseño
```

---

## 🛠️ Guía Rápida: Cómo Agregar o Actualizar Proyectos y Habilidades

Toda la información está centralizada en [`js/data.js`](./js/data.js). Tanto `index.html` como `cv.html` se actualizan automáticamente:

1. **Agregar o editar un Proyecto (`window.PORTFOLIO_DATA.projects`):**
   - Define `published: true` para publicarlo (o `published: false` para mantenerlo oculto como borrador).
   - Incluye `title` / `titleEn`, `shortDescription` / `shortDescriptionEn`, `categories` (`["web"]`, `["app"]`, `["mecatronica"]`), `image` y los detalles para el **Modal de Ficha Técnica** (`problem`, `architecture`, `features`, `metrics`, `tags`, `repoUrl`, `demoUrl`).
2. **Actualizar Habilidades (`window.PORTFOLIO_DATA.skillCategories`):**
   - Edita los arreglos `skills` (Español) y `skillsEn` (Inglés) dentro de cada categoría.
3. **Ejecutar Auditoría de Calidad antes de hacer Push:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\verify.ps1
   ```

---

## 📬 Contacto Directo
- **Correo:** [Socialedgar0710@gmail.com](mailto:Socialedgar0710@gmail.com)
- **GitHub:** [github.com/Edgar-LT](https://github.com/Edgar-LT)
- **WhatsApp:** [+58 412-9640005](https://wa.me/584129640005)
