/* ==========================================================================
   FUENTE ÚNICA DE DATOS DEL PORTAFOLIO (js/data.js)
   Edgar López — Ingeniería Mecatrónica, Desarrollo Web & Aplicaciones
   --------------------------------------------------------------------------
   Colores de identidad (accent):
   - "blue"   -> Desarrollo Web (Azul Real)
   - "indigo" -> Aplicaciones (Índigo / Violeta)
   - "teal"   -> Ingeniería Mecatrónica (Verde Esmeralda / Teal)
   ========================================================================== */

window.PORTFOLIO_DATA = {
  /* ========================================================================
     1. PROYECTOS DESTACADOS
     Categorías válidas para el filtro: "web", "app", "mecatronica"
     ======================================================================== */
  projects: [
    {
      id: "proyecto-01",
      categoryLabel: "Desarrollo Web",
      status: "Plantilla lista",
      categories: ["web"],
      accent: "blue",
      icon: "language",
      title: "Proyecto Web Full-Stack 01",
      shortDescription:
        "Espacio reservado para tu primer proyecto web. Describe aquí qué problema resuelve la plataforma y cuál fue tu aporte principal en el desarrollo.",
      image: null,
      role: "Desarrollador Full-Stack",
      problem:
        "Describe el problema o necesidad real que dio origen al proyecto (por ejemplo: optimizar la gestión de datos, digitalizar un servicio o crear una interfaz rápida y accesible).",
      architecture:
        "Explica cómo estructuraste la solución: tecnologías de frontend empleadas, consumo de APIs o estructura de base de datos.",
      features: [
        "Diseño responsivo adaptado a escritorio y dispositivos móviles.",
        "Arquitectura modular y código mantenible.",
        "Optimización de carga y experiencia de usuario fluida."
      ],
      tags: ["HTML5 / CSS3", "JavaScript", "Framework Web"],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos"
    },
    {
      id: "proyecto-02",
      categoryLabel: "Aplicaciones",
      status: "Plantilla lista",
      categories: ["app"],
      accent: "indigo",
      icon: "smartphone",
      title: "Aplicación Multiplataforma 02",
      shortDescription:
        "Espacio reservado para una aplicación móvil o de escritorio. Detalla su propósito, la fluidez de su interfaz y las integraciones implementadas.",
      image: null,
      role: "Desarrollador de Aplicaciones",
      problem:
        "Describe qué flujo o tarea cotidiana buscabas simplificar para el usuario final mediante una aplicación dedicada.",
      architecture:
        "Detalla cómo construiste las vistas, la navegación, el manejo de estado y el almacenamiento local o en la nube.",
      features: [
        "Interfaz intuitiva enfocada en usabilidad y rapidez.",
        "Sincronización de datos y manejo de estados de carga.",
        "Diseño adaptable a múltiples resoluciones de pantalla."
      ],
      tags: ["Desarrollo Móvil", "UI / UX", "APIs"],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos"
    },
    {
      id: "proyecto-03",
      categoryLabel: "Mecatrónica & IoT",
      status: "Plantilla lista",
      categories: ["mecatronica", "web"],
      accent: "teal",
      icon: "precision_manufacturing",
      title: "Sistema de Control & Monitoreo 03",
      shortDescription:
        "Espacio reservado para un proyecto de Ingeniería Mecatrónica, electrónica o IoT que integre sensores/actuadores con una interfaz de software.",
      image: null,
      role: "Ingeniería & Software",
      problem:
        "Describe el requerimiento de control físico, instrumentación electrónica o lectura de sensores que debía resolverse.",
      architecture:
        "Detalla la integración entre el microcontrolador, los sensores/actuadores y la interfaz web o móvil de supervisión.",
      features: [
        "Adquisición y procesamiento confiable de señales de sensores.",
        "Lógica de control estructurada y validación operativa.",
        "Panel de visualización para monitoreo de variables."
      ],
      tags: ["C / C++", "Microcontroladores", "Sensores & Control"],
      repoUrl: "https://github.com/Edgar-LT",
      demoUrl: "#proyectos"
    },
    {
      id: "proyecto-04",
      categoryLabel: "Desarrollo Web / App",
      status: "Plantilla lista",
      categories: ["web", "app"],
      accent: "blue",
      icon: "layers",
      title: "Herramienta o Sistema Técnico 04",
      shortDescription:
        "Espacio reservado para mostrar una utilidad de software, automatización o aplicación web interactiva desarrollada por ti.",
      image: null,
      role: "Desarrollador Principal",
      problem:
        "Describe qué proceso manual o cálculo técnico buscabas automatizar con esta herramienta.",
      architecture:
        "Explica cómo organizaste la lógica de negocio, los componentes de la interfaz y el despliegue del proyecto.",
      features: [
        "Procesamiento rápido de datos directamente en la interfaz.",
        "Diseño limpio enfocado en la productividad.",
        "Despliegue web accesible desde cualquier navegador."
      ],
      tags: ["JavaScript", "Tailwind CSS", "Git"],
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
      description: "Interfaces modernas, responsivas y rápidas.",
      accent: "blue",
      icon: "code",
      skills: [
        "HTML5 Semántico",
        "CSS3 & Tailwind CSS",
        "JavaScript (ES6+)",
        "Diseño Responsivo",
        "Consumo de APIs REST",
        "[ Agregar Framework ]"
      ]
    },
    {
      id: "apps-mobile",
      title: "Aplicaciones",
      description: "Soluciones móviles y multiplataforma.",
      accent: "indigo",
      icon: "smartphone",
      skills: [
        "Desarrollo Multiplataforma",
        "Diseño de Interfaces (UI/UX)",
        "Gestión de Estado",
        "Integración de Servicios",
        "[ Agregar Lenguaje / SDK ]"
      ]
    },
    {
      id: "mecatronica-hw",
      title: "Ingeniería Mecatrónica",
      description: "Sistemas embebidos, control y hardware.",
      accent: "teal",
      icon: "precision_manufacturing",
      skills: [
        "Lógica de Programación C / C++",
        "Microcontroladores",
        "Sensores & Actuadores",
        "Sistemas de Control",
        "Diseño CAD & Simulación"
      ]
    },
    {
      id: "backend-tools",
      title: "Herramientas & Entorno",
      description: "Control de versiones, bases de datos y despliegue.",
      accent: "blue",
      icon: "terminal",
      skills: [
        "Git & GitHub",
        "Bases de Datos SQL / NoSQL",
        "VS Code / Antigravity",
        "GitHub Pages",
        "Documentación Técnica"
      ]
    }
  ],

  /* ========================================================================
     3. TRAYECTORIA & FORMACIÓN
     ======================================================================== */
  timeline: [
    {
      period: "Actualidad · Caracas, Venezuela",
      badge: "En curso",
      accent: "blue",
      title: "Desarrollador Web y de Aplicaciones",
      description:
        "Diseño y construcción de sitios web modernos, interfaces responsivas y aplicaciones con arquitectura modular, buenas prácticas de código y control de versiones en GitHub."
    },
    {
      period: "Formación Universitaria · Caracas, Venezuela",
      badge: "Pregrado",
      accent: "teal",
      title: "Estudiante de Ingeniería Mecatrónica",
      description:
        "Formación en sistemas mecánicos, electrónica, automatización, control y programación aplicada a la integración de hardware y software."
    },
    {
      period: "Práctica Continua",
      badge: "Portafolio",
      accent: "indigo",
      title: "Desarrollo de Proyectos & Prototipos",
      description:
        "Creación progresiva de proyectos prácticos que combinan desarrollo web, aplicaciones móviles y soluciones de ingeniería."
    }
  ]
};
