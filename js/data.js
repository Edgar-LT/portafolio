/* ==========================================================================
   FUENTE ÚNICA DE DATOS DEL PORTAFOLIO (DATA-DRIVEN ARCHITECTURE)
   Edgar López // Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   --------------------------------------------------------------------------
   Para agregar o modificar un Proyecto, Lenguaje/Habilidad o Hito de
   Trayectoria, basta con editar este archivo sin tocar index.html.
   ========================================================================== */

window.PORTFOLIO_DATA = {
  /* ========================================================================
     1. PROYECTOS DESTACADOS (Con Ficha Técnica Completa para el Modal)
     Categorías válidas para el filtro: "web", "app", "mecatronica"
     ======================================================================== */
  projects: [
    {
      id: "proyecto-01",
      code: "PROYECTO // 01",
      status: "PLANTILLA LISTA",
      categories: ["web", "mecatronica"],
      badgeText: "WEB / IOT",
      badgeStyle: "border-primary-container/30 text-primary-container",
      title: "[ Título del Proyecto 01 ]",
      shortDescription:
        "Espacio reservado para describir tu proyecto: el problema que resuelve, cómo lo diseñaste y qué funcionalidades clave implementaste en la interfaz o el sistema.",
      image: "assets/project-1.png",
      role: "Desarrollador Principal",
      problem:
        "Describe aquí el reto técnico o necesidad real que dio origen al proyecto (por ejemplo: monitoreo en tiempo real, automatización de un proceso o digitalización de un flujo de trabajo).",
      architecture:
        "Explica cómo estructuraste la solución técnica: qué capas utilizaste en el frontend, cómo se procesan los datos en el backend o microcontrolador y cómo se comunican entre sí.",
      features: [
        "Interfaz responsiva de alta velocidad con telemetría y visualización de estado.",
        "Arquitectura modular preparada para escalar nuevas funciones.",
        "Integración limpia entre la capa de datos y la experiencia de usuario."
      ],
      tags: [
        { name: "[ Lenguaje Principal ]", highlight: "primary" },
        { name: "[ Framework / Librería ]", highlight: "default" },
        { name: "[ Base de Datos / Hardware ]", highlight: "default" }
      ],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos",
      demoLabel: "[ live_demo ]"
    },
    {
      id: "proyecto-02",
      code: "PROYECTO // 02",
      status: "PLANTILLA LISTA",
      categories: ["mecatronica", "app"],
      badgeText: "MECATRÓNICA / CONTROL",
      badgeStyle: "border-secondary-fixed/30 text-secondary-fixed",
      title: "[ Título del Proyecto 02 ]",
      shortDescription:
        "Espacio reservado para detallar un proyecto de ingeniería mecatrónica, automatización, prototipo electrónico o aplicación conectada a hardware.",
      image: "assets/project-2.png",
      role: "Ingeniería & Código",
      problem:
        "Describe el requerimiento de control físico, instrumentación electrónica o cinemática que debía resolverse con precisión.",
      architecture:
        "Detalla la integración hardware-software: sensores/actuadores empleados, lógica de control programada y protocolo de comunicación con la interfaz de control.",
      features: [
        "Lectura y procesamiento de señales de sensores con baja latencia.",
        "Lógica de control estructurada con validación de límites de seguridad.",
        "Interfaz de supervisión para ajuste de parámetros de operación."
      ],
      tags: [
        { name: "[ Lenguaje / Control ]", highlight: "secondary" },
        { name: "[ Microcontrolador / CAD ]", highlight: "default" },
        { name: "[ Interfaz / App ]", highlight: "default" }
      ],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos",
      demoLabel: "[ ver_esquema ]"
    },
    {
      id: "proyecto-03",
      code: "PROYECTO // 03",
      status: "PLANTILLA LISTA",
      categories: ["web"],
      badgeText: "FULL-STACK WEB",
      badgeStyle: "border-primary-container/30 text-primary-container",
      title: "[ Título del Proyecto 03 ]",
      shortDescription:
        "Espacio reservado para presentar una plataforma web, sistema de gestión, catálogo interactivo o aplicación web desarrollada por ti.",
      image: "assets/project-3.png",
      role: "Full-Stack Developer",
      problem:
        "Describe qué necesidad tenía el usuario o negocio y qué limitaciones presentaban las soluciones previas antes de tu desarrollo.",
      architecture:
        "Explica el diseño de la interfaz web, la estructura de componentes reutilizables, el manejo de estado y la persistencia en base de datos.",
      features: [
        "Diseño UI/UX moderno adaptado a dispositivos móviles y escritorio.",
        "Optimización de tiempos de carga, SEO semántico y accesibilidad.",
        "Gestión estructurada de datos y validación de formularios."
      ],
      tags: [
        { name: "[ Frontend ]", highlight: "primary" },
        { name: "[ Estilos / UI ]", highlight: "default" },
        { name: "[ Backend / DB ]", highlight: "default" }
      ],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos",
      demoLabel: "[ ver_web ]"
    },
    {
      id: "proyecto-04",
      code: "PROYECTO // 04",
      status: "PLANTILLA LISTA",
      categories: ["app"],
      badgeText: "MOBILE / APP",
      badgeStyle: "border-tertiary-fixed-dim/30 text-tertiary-fixed-dim",
      title: "[ Título del Proyecto 04 ]",
      shortDescription:
        "Espacio reservado para mostrar una aplicación móvil o multiplataforma, destacando su experiencia de usuario, flujo de pantallas e integraciones.",
      image: "assets/project-4.png",
      role: "App Developer",
      problem:
        "Describe el flujo móvil o de aplicación que buscabas agilizar para el usuario final en su día a día o en trabajo de campo.",
      architecture:
        "Detalla cómo construiste las pantallas, la navegación, el almacenamiento local/remoto y la sincronización de estados en la aplicación.",
      features: [
        "Flujo de navegación intuitivo con retroalimentación visual inmediata.",
        "Consumo eficiente de recursos y manejo de estados sin conexión.",
        "Integración con APIs o módulos nativos del dispositivo."
      ],
      tags: [
        { name: "[ SDK / Lenguaje App ]", highlight: "tertiary" },
        { name: "[ Estado / API ]", highlight: "default" },
        { name: "[ Plataforma ]", highlight: "default" }
      ],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos",
      demoLabel: "[ demo_app ]"
    }
  ],

  /* ========================================================================
     2. STACK TECNOLÓGICO & HABILIDADES (Por Capas Funcionales)
     Niveles sugeridos: "Avanzado", "Intermedio", "En Formación"
     ======================================================================== */
  skillCategories: [
    {
      id: "mecatronica-hw",
      title: "01 // MECATRÓNICA & HW",
      icon: "memory",
      accentText: "text-secondary-fixed",
      barColor: "bg-secondary-fixed",
      items: [
        { name: "[ Lenguaje / C / C++ ]", level: "En Formación", progress: 80 },
        { name: "[ Microcontroladores ]", level: "En Formación", progress: 78 },
        { name: "[ Electrónica & Sensores ]", level: "En Formación", progress: 75 },
        { name: "[ Diseño CAD / Simulación ]", level: "En Formación", progress: 72 }
      ]
    },
    {
      id: "frontend-web",
      title: "02 // FRONTEND & WEB",
      icon: "code",
      accentText: "text-primary-container",
      barColor: "bg-primary-container",
      items: [
        { name: "HTML5 / CSS3 / JavaScript", level: "Intermedio", progress: 85 },
        { name: "Tailwind CSS & UI Responsivo", level: "Intermedio", progress: 85 },
        { name: "[ Framework Frontend ]", level: "En Formación", progress: 75 },
        { name: "[ Consumo de APIs / JSON ]", level: "Intermedio", progress: 80 }
      ]
    },
    {
      id: "apps-mobile",
      title: "03 // APPS & MOBILE",
      icon: "smartphone",
      accentText: "text-tertiary-fixed-dim",
      barColor: "bg-tertiary-fixed-dim",
      items: [
        { name: "[ Framework Móvil / App ]", level: "En Formación", progress: 78 },
        { name: "[ Lenguaje de Apps ]", level: "En Formación", progress: 78 },
        { name: "Diseño de Interfaces UI/UX", level: "Intermedio", progress: 80 },
        { name: "[ Comunicación / Servicios ]", level: "En Formación", progress: 72 }
      ]
    },
    {
      id: "backend-tools",
      title: "04 // BACKEND & TOOLS",
      icon: "hub",
      accentText: "text-primary",
      barColor: "bg-primary",
      items: [
        { name: "Git & GitHub Workflow", level: "Intermedio", progress: 85 },
        { name: "[ Lenguaje Backend ]", level: "En Formación", progress: 75 },
        { name: "[ Bases de Datos SQL/NoSQL ]", level: "En Formación", progress: 75 },
        { name: "Despliegue Web (GitHub Pages)", level: "Intermedio", progress: 85 }
      ]
    }
  ],

  /* ========================================================================
     3. LÍNEA DE TIEMPO — FORMACIÓN & TRAYECTORIA
     ======================================================================== */
  timeline: [
    {
      period: "ACTUALIDAD · CARACAS, VENEZUELA",
      periodColor: "text-primary-container",
      badge: "ACTIVO",
      badgeStyle: "bg-surface-container-high border border-secondary-fixed/30 text-secondary-fixed",
      title: "Desarrollador Web & de Aplicaciones",
      description:
        "Diseño y desarrollo de páginas web modernas, interfaces responsivas y soluciones de software con arquitectura modular y control de versiones en GitHub."
    },
    {
      period: "EN CURSO · FORMACIÓN UNIVERSITARIA",
      periodColor: "text-secondary-fixed",
      badge: "INGENIERÍA",
      badgeStyle: "bg-surface-container-high border border-white/10 text-on-surface",
      title: "Estudiante de Ingeniería Mecatrónica",
      description:
        "Formación integral combinando ingeniería mecánica, electrónica, sistemas de control, automatización y programación para el diseño de sistemas inteligentes."
    },
    {
      period: "PROYECTOS & LABORATORIO",
      periodColor: "text-on-surface-variant",
      badge: "PRÁCTICA TÉCNICA",
      badgeStyle: "bg-surface-container-high border border-white/10 text-outline",
      title: "Desarrollo de Prototipos & Software Aplicado",
      description:
        "Construcción progresiva de un portafolio técnico integrando aplicaciones web, apps multiplataforma y proyectos de ingeniería mecatrónica."
    }
  ]
};
