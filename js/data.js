/* ==========================================================================
   FUENTE ÚNICA DE DATOS DEL PORTAFOLIO (js/data.js)
   Edgar López — Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   --------------------------------------------------------------------------
   Colores de identidad (accent):
   - "blue"   -> Desarrollo Web (Azul Real)
   - "indigo" -> Aplicaciones (Índigo / Violeta)
   - "teal"   -> Ingeniería Mecatrónica (Verde Esmeralda / Teal)

   Nota: Si agregas un proyecto en borrador con `published: false`, se ocultará
   automáticamente tanto en `index.html` como en el CV imprimible (`cv.html`).
   ========================================================================== */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Edgar López",
    location: "Caracas, Venezuela",
    timezone: "UTC-4",
    email: "Socialedgar0710@gmail.com",
    phone: "+58 412-9640005",
    whatsappUrl: "https://wa.me/584129640005",
    githubUser: "Edgar-LT",
    githubUrl: "https://github.com/Edgar-LT",
    portfolioUrl: "https://edgar-lt.github.io/portafolio/"
  },

  /* ========================================================================
     1. PROYECTOS DESTACADOS
     Categorías válidas para el filtro: "web", "app", "mecatronica"
     ======================================================================== */
  projects: [
    {
      id: "voxpdf-studio",
      published: true,
      categoryLabel: "Aplicaciones & Python",
      categoryLabelEn: "Applications & Python",
      status: "Desplegado",
      statusEn: "Deployed",
      categories: ["app", "web"],
      accent: "indigo",
      icon: "graphic_eq",
      title: "VoxPDF Studio — Conversor de PDF a Audiolibro",
      titleEn: "VoxPDF Studio — PDF to Audiobook Converter",
      shortDescription:
        "Aplicación híbrida en Python (FastAPI + PyMuPDF + edge-tts) e interfaz web interactiva que transforma libros y documentación técnica en audiolibros con limpieza geométrica y seguimiento visual.",
      shortDescriptionEn:
        "Hybrid Python application (FastAPI + PyMuPDF + edge-tts) and interactive web studio that converts books and technical documentation into audiobooks with geometric text cleaning and live visual tracking.",
      image: "assets/projects/voxpdf-studio.svg",
      role: "Arquitectura & Desarrollo Full-Stack Python",
      roleEn: "Full-Stack Python Architecture & Development",
      problem:
        "Convertir libros, manuales de ingeniería y datasheets extensos en formato PDF a audiolibros fluidos sin que los encabezados repetitivos, números de página o palabras cortadas por guion interrumpan la narración.",
      problemEn:
        "Convert long engineering manuals, books, and PDF datasheets into natural audiobooks without repetitive headers, page numbers, or hyphenated line breaks interrupting the narration.",
      architecture:
        "Backend modular en Python 3.12 con FastAPI, extracción geométrica por coordenadas (bbox) mediante PyMuPDF (fitz), síntesis neuronal con Microsoft Edge TTS y caché SHA-256, acoplado a un reproductor de estudio con PDF.js y modo live en GitHub Pages.",
      architectureEn:
        "Modular Python 3.12 backend with FastAPI, coordinate-based bounding-box extraction via PyMuPDF (fitz), Microsoft Edge neural TTS synthesis with SHA-256 caching, coupled with a PDF.js split-view player.",
      features: [
        "Limpieza inteligente por coordenadas: omite encabezados/pies repetidos, números de página y reconstruye palabras con guion.",
        "Reproductor interactivo con vista dividida PDF + Guion, resaltado oración por oración y precarga asíncrona sin pausas.",
        "Control de velocidad (0.5x–2.0x), catálogo de 8 voces neuronales (ES/EN), guardado automático de progreso y exportación a MP3."
      ],
      featuresEn: [
        "Smart coordinate filtering: strips repeated headers/footers, page numbers, and rejoins hyphenated words across lines.",
        "Interactive split-screen PDF + Script player with sentence-by-sentence highlighting and gapless async prefetching.",
        "Playback speed control (0.5x–2.0x), 8 neural voices (ES/EN), automatic progress persistence, and MP3 export."
      ],
      metrics: [
        { label: "Motor PDF", value: "PyMuPDF (bbox)" },
        { label: "Caché Audio", value: "SHA-256" },
        { label: "Voces TTS", value: "8 Neuronales" }
      ],
      tags: ["Python 3.12", "FastAPI", "PyMuPDF", "Edge-TTS", "PDF.js"],
      repoUrl: "https://github.com/Edgar-LT/lector-de-pdf",
      demoUrl: "https://edgar-lt.github.io/lector-de-pdf/"
    },
    {
      id: "robotic-arm-simulation",
      published: true,
      categoryLabel: "Mecatrónica & Robótica",
      categoryLabelEn: "Mechatronics & Robotics",
      status: "Simulación 3D",
      statusEn: "3D Simulation",
      categories: ["mecatronica", "app"],
      accent: "teal",
      icon: "precision_manufacturing",
      title: "Celda Robótica 3D & Cinemática de Brazo Manipulador",
      titleEn: "3D Robotic Cell & Manipulator Arm Kinematics",
      shortDescription:
        "Entorno virtual de simulación y control para brazo robótico articulado orientado a tareas industriales de Pick & Place, con cálculo cinemático y manipulación de piezas entre estaciones.",
      shortDescriptionEn:
        "Virtual simulation and control environment for an articulated robotic arm designed for industrial Pick & Place operations, featuring kinematics calculation and workpiece handling.",
      image: "assets/projects/robotic-arm-simulation.png",
      role: "Modelado 3D, Cinemática & Control",
      roleEn: "3D Modeling, Kinematics & Control",
      problem:
        "Validar algoritmos de cinemática, alcances de trabajo y secuencias de agarre y transporte de piezas (Pick & Place) en un gemelo digital antes de transferir las trayectorias al hardware físico.",
      problemEn:
        "Validate kinematics algorithms, workspace reachability, and automated pick-and-place trajectories in a digital twin before deploying control code onto physical hardware.",
      architecture:
        "Entorno de simulación 3D interactivo con cálculo de cinemática directa/inversa, definición de eslabones y articulaciones, detección de agarre de objetos cilíndricos/cúbicos y panel de control para supervisión de ángulos y coordenadas.",
      architectureEn:
        "Interactive 3D simulation environment featuring forward/inverse kinematics, link and joint definitions, collision/grasp detection for workpieces, and a supervisory control dashboard.",
      features: [
        "Simulación dinámica de brazo robótico industrial con grados de libertad articulados y efector final.",
        "Estaciones de trabajo de origen y destino con objetos identificados para secuencias automatizadas de manipulación.",
        "Interfaz gráfica de supervisión con visualización espacial en tiempo real y cuadrícula milimétrica de referencia."
      ],
      featuresEn: [
        "Dynamic simulation of an articulated industrial robotic arm with multi-axis joints and end-effector.",
        "Source and target workstations with color-coded workpieces for automated handling routines.",
        "Supervisory graphical interface with real-time spatial rendering and metric reference grid."
      ],
      metrics: [
        { label: "Operación", value: "Pick & Place 3D" },
        { label: "Lógica", value: "Cinemática & Trayectoria" },
        { label: "Entorno", value: "Gemelo Digital" }
      ],
      tags: ["Robótica", "Cinemática", "Modelado 3D", "Pick & Place", "Gemelo Digital"],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos"
    },
    {
      id: "pid-telemetry-lab",
      published: true,
      categoryLabel: "Mecatrónica & Control",
      categoryLabelEn: "Mechatronics & Control",
      status: "Interactivo en vivo",
      statusEn: "Live Interactive",
      categories: ["mecatronica", "web"],
      accent: "teal",
      icon: "precision_manufacturing",
      title: "Laboratorio de Control PID & Telemetría en Tiempo Real",
      titleEn: "Real-Time PID Control & Telemetry Laboratory",
      shortDescription:
        "Simulador interactivo en lazo cerrado para sintonización de controladores PID (Kp, Ki, Kd) sobre un actuador electromecánico de segundo orden con inyección de perturbaciones y osciloscopio digital.",
      shortDescriptionEn:
        "Interactive closed-loop simulator for tuning PID controllers (Kp, Ki, Kd) on a second-order electromechanical actuator with load disturbance injection and real-time digital oscilloscope.",
      image: "assets/projects/pid-telemetry-lab.svg",
      role: "Ingeniería de Control & Simulación Numérica",
      roleEn: "Control Engineering & Numerical Simulation",
      problem:
        "Visualizar y evaluar de forma intuitiva el impacto de las ganancias proporcional, integral y derivativa (junto con saturación anti-windup de PWM y perturbaciones de par) antes de implementar el firmware en un microcontrolador físico.",
      problemEn:
        "Intuitively visualize and evaluate the impact of proportional, integral, and derivative gains—including PWM anti-windup saturation and torque disturbances—before flashing firmware onto a physical microcontroller.",
      architecture:
        "Motor de integración numérica discreta (Euler/RK2 con paso dt fijo) ejecutado en cliente a 60 FPS sobre HTML5 Canvas de alta densidad (DPI-aware), con cálculo automático de sobreimpulso (%Mp), tiempo de establecimiento (Ts) y error estacionario (ess).",
      architectureEn:
        "Discrete-time numerical integration engine (fixed-step Euler/RK2) running client-side on a high-DPI HTML5 Canvas, featuring live computation of overshoot (%Mp), settling time (Ts), and steady-state error (ess).",
      features: [
        "Sintonización en tiempo real de ganancias Kp, Ki, Kd y referencia (Setpoint) con presets de respuesta subamortiguada, crítica y rápida.",
        "Cálculo instantáneo de telemetría de control: Sobreimpulso máximo (Mp%), Tiempo de establecimiento (Ts) y esfuerzo de control PWM.",
        "Inyección interactiva de perturbaciones de carga para comprobar el rechazo a perturbaciones del lazo cerrado."
      ],
      featuresEn: [
        "Real-time tuning of Kp, Ki, Kd gains and Setpoint with presets for underdamped, critically damped, and aggressive responses.",
        "Instant control telemetry calculation: Peak Overshoot (Mp%), Settling Time (Ts), and PWM actuator effort.",
        "Interactive load disturbance injection to test closed-loop disturbance rejection."
      ],
      metrics: [
        { label: "Lazo de Control", value: "PID + Anti-Windup" },
        { label: "Planta", value: "2.º Orden DC/Actuador" },
        { label: "Telemetría", value: "Mp% · Ts · ess · PWM" }
      ],
      tags: ["Control PID", "Sistemas Dinámicos", "JavaScript ES6+", "HTML5 Canvas", "Telemetría"],
      repoUrl: "https://github.com/Edgar-LT/portafolio",
      demoUrl: "https://github.com/Edgar-LT/portafolio"
    },
    {
      id: "portfolio-architecture",
      published: true,
      categoryLabel: "Desarrollo Web",
      categoryLabelEn: "Web Development",
      status: "Producción",
      statusEn: "Production",
      categories: ["web", "app"],
      accent: "blue",
      icon: "layers",
      title: "Arquitectura de Portafolio & Motor CV Data-Driven",
      titleEn: "Data-Driven Portfolio Architecture & CV Engine",
      shortDescription:
        "Plataforma web modular con fuente única de datos (SSOT), internacionalización instantánea (ES/EN), sincronización con GitHub REST API y generador dinámico de Currículum Vitae imprimible en PDF.",
      shortDescriptionEn:
        "Modular web platform powered by a Single Source of Truth (SSOT), instant internationalization (ES/EN), live GitHub REST API telemetry, and a dynamic printable PDF résumé engine.",
      image: "assets/projects/portfolio-architecture.svg",
      role: "Arquitectura Frontend & Accesibilidad WCAG 2.1 AA",
      roleEn: "Frontend Architecture & WCAG 2.1 AA Accessibility",
      problem:
        "Mantener sincronizados un portafolio web interactivo, múltiples idiomas (Español/Inglés) y una hoja de vida técnica en formato PDF suele requerir editar varios archivos manualmente, generando inconsistencias.",
      problemEn:
        "Keeping an interactive web portfolio, multiple languages (Spanish/English), and a printable technical PDF résumé in sync usually requires manual edits across multiple files, leading to inconsistencies.",
      architecture:
        "Arquitectura desacoplada basada en un esquema central (`js/data.js`) que alimenta simultáneamente la SPA principal (`index.html`) y el documento de impresión (`cv.html`), con temas de alto contraste, datos estructurados Schema.org y script de auditoría CI en PowerShell.",
      architectureEn:
        "Decoupled architecture driven by a central schema (`js/data.js`) that simultaneously hydrates the main interface (`index.html`) and print sheet (`cv.html`), with high-contrast theming, Schema.org JSON-LD, and a PowerShell QA audit script.",
      features: [
        "Fuente única de datos (`js/data.js`) que actualiza automáticamente el sitio web y el CV imprimible en Español e Inglés.",
        "Accesibilidad WCAG 2.1 AA: navegación completa por teclado, Focus Trap en modales, contraste verificado y soporte de tema Claro/Oscuro.",
        "Integración con la API pública de GitHub con caché local y pipeline de verificación de integridad (`scripts/verify.ps1`)."
      ],
      featuresEn: [
        "Single Source of Truth (`js/data.js`) that automatically updates both the web portfolio and printable CV in Spanish and English.",
        "WCAG 2.1 AA accessibility: full keyboard navigation, modal Focus Trap, verified contrast tokens, and Light/Dark theme persistence.",
        "Live GitHub API integration with session caching and automated integrity verification (`scripts/verify.ps1`)."
      ],
      metrics: [
        { label: "Arquitectura", value: "SSOT Data-Driven" },
        { label: "Estándar", value: "WCAG 2.1 AA + SEO" },
        { label: "Idiomas", value: "ES / EN Simultáneo" }
      ],
      tags: ["HTML5 Semántico", "CSS Variables", "JavaScript Modular", "GitHub API", "WCAG 2.1 AA"],
      repoUrl: "https://github.com/Edgar-LT/portafolio",
      demoUrl: "cv.html"
    },
    {
      id: "plantilla-futuro-proyecto",
      published: false,
      categoryLabel: "Plantilla Base",
      status: "Borrador",
      categories: ["web", "app", "mecatronica"],
      accent: "blue",
      icon: "folder_code",
      title: "Plantilla para Nuevo Proyecto (Oculta por published: false)",
      shortDescription:
        "Duplica este bloque y cambia `published: true` cuando quieras publicar un nuevo proyecto en el portafolio y en el CV.",
      image: null,
      role: "Rol en el proyecto",
      problem: "Problema técnico resuelto.",
      architecture: "Arquitectura implementada.",
      features: ["Característica 1", "Característica 2"],
      tags: ["Tecnología 1", "Tecnología 2"],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos"
    }
  ],

  /* ========================================================================
     2. STACK TECNOLÓGICO & HABILIDADES
     ======================================================================== */
  skillCategories: [
    {
      id: "frontend-web",
      title: "Desarrollo Web",
      titleEn: "Web Development",
      description: "Interfaces modernas, responsivas, accesibles y orientadas al rendimiento.",
      descriptionEn: "Modern, responsive, accessible, and performance-oriented web interfaces.",
      accent: "blue",
      icon: "code",
      skills: [
        "HTML5 Semántico & SEO",
        "CSS3 & Tailwind CSS",
        "JavaScript (ES6+)",
        "Diseño Responsivo & Accesible (WCAG)",
        "Consumo de APIs REST & JSON",
        "Arquitectura Modular Data-Driven"
      ],
      skillsEn: [
        "Semantic HTML5 & SEO",
        "CSS3 & Tailwind CSS",
        "JavaScript (ES6+)",
        "Responsive & Accessible Design (WCAG)",
        "REST APIs & JSON Integration",
        "Data-Driven Modular Architecture"
      ]
    },
    {
      id: "apps-mobile",
      title: "Aplicaciones & Backend",
      titleEn: "Applications & Backend",
      description: "Soluciones multiplataforma, procesamiento de documentos y servicios en Python.",
      descriptionEn: "Cross-platform solutions, document processing, and Python backend services.",
      accent: "indigo",
      icon: "smartphone",
      skills: [
        "Python 3 & FastAPI",
        "Desarrollo Multiplataforma",
        "Diseño de Interfaces (UI/UX)",
        "Procesamiento PDF (PyMuPDF / PDF.js)",
        "Síntesis de Voz Neuronal (Edge-TTS)",
        "Gestión de Estado & Caché SHA-256"
      ],
      skillsEn: [
        "Python 3 & FastAPI",
        "Cross-Platform Development",
        "UI/UX Interface Design",
        "PDF Processing (PyMuPDF / PDF.js)",
        "Neural Speech Synthesis (Edge-TTS)",
        "State Management & SHA-256 Caching"
      ]
    },
    {
      id: "mecatronica-hw",
      title: "Ingeniería Mecatrónica",
      titleEn: "Mechatronics Engineering",
      description: "Sistemas embebidos, modelado dinámico, control automático y hardware.",
      descriptionEn: "Embedded systems, dynamic modeling, automatic control, and hardware integration.",
      accent: "teal",
      icon: "precision_manufacturing",
      skills: [
        "Programación en C / C++",
        "Microcontroladores (Arduino / ESP32)",
        "Sensores, Actuadores & PWM",
        "Sistemas de Control Clásico (PID)",
        "Instrumentación & Telemetría",
        "Diseño CAD & Simulación"
      ],
      skillsEn: [
        "C / C++ Programming",
        "Microcontrollers (Arduino / ESP32)",
        "Sensors, Actuators & PWM",
        "Classical Control Systems (PID)",
        "Instrumentation & Telemetry",
        "CAD Design & Simulation"
      ]
    },
    {
      id: "backend-tools",
      title: "Herramientas & Entorno",
      titleEn: "Tools & Environment",
      description: "Control de versiones, bases de datos, automatización y despliegue continuo.",
      descriptionEn: "Version control, databases, scripting automation, and continuous deployment.",
      accent: "blue",
      icon: "terminal",
      skills: [
        "Git & GitHub (CI/CD Pages)",
        "Bases de Datos SQL / NoSQL",
        "PowerShell & Automatización QA",
        "VS Code / Entornos de Desarrollo",
        "Documentación Técnica & Esquemas"
      ],
      skillsEn: [
        "Git & GitHub (Pages CI/CD)",
        "SQL / NoSQL Databases",
        "PowerShell & QA Automation",
        "VS Code / Development Environments",
        "Technical Documentation & Schematics"
      ]
    }
  ],

  /* ========================================================================
     3. TRAYECTORIA & FORMACIÓN
     ======================================================================== */
  timeline: [
    {
      period: "Actualidad · Caracas, Venezuela",
      periodEn: "Present · Caracas, Venezuela",
      badge: "En curso",
      badgeEn: "Ongoing",
      accent: "blue",
      title: "Desarrollador Web y de Aplicaciones",
      titleEn: "Web & Application Developer",
      description:
        "Diseño y construcción de sitios web modernos, interfaces responsivas y aplicaciones en Python/JavaScript (como VoxPDF Studio) con arquitectura modular, buenas prácticas y despliegue en GitHub.",
      descriptionEn:
        "Design and development of modern websites, responsive interfaces, and Python/JavaScript applications (such as VoxPDF Studio) using modular architecture, clean code practices, and GitHub deployment."
    },
    {
      period: "Formación Universitaria · Caracas, Venezuela",
      periodEn: "University Education · Caracas, Venezuela",
      badge: "Pregrado",
      badgeEn: "Undergraduate",
      accent: "teal",
      title: "Estudiante de Ingeniería Mecatrónica",
      titleEn: "Mechatronics Engineering Student",
      description:
        "Formación en sistemas mecánicos, electrónica, instrumentación, automatización, control clásico (PID) y programación aplicada a la integración entre hardware y software.",
      descriptionEn:
        "Academic training in mechanical systems, electronics, instrumentation, automation, classical PID control, and programming applied to hardware-software integration."
    },
    {
      period: "Práctica Continua & Open Source",
      periodEn: "Continuous Practice & Open Source",
      badge: "Portafolio",
      badgeEn: "Portfolio",
      accent: "indigo",
      title: "Desarrollo de Sistemas Híbridos & Herramientas Técnicas",
      titleEn: "Hybrid Systems & Technical Tooling Development",
      description:
        "Creación de soluciones prácticas que unen procesamiento de datos, simuladores interactivos de ingeniería y experiencias de usuario accesibles.",
      descriptionEn:
        "Creation of practical solutions combining data processing, interactive engineering simulators, and accessible user experiences."
    }
  ]
};
