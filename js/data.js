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
      id: "voxpdf-studio",
      categoryLabel: "Aplicaciones & Python",
      status: "Desplegado",
      categories: ["app", "web"],
      accent: "indigo",
      icon: "graphic_eq",
      title: "VoxPDF Studio — Conversor de PDF a Audiolibro",
      shortDescription:
        "Aplicación híbrida en Python (FastAPI + PyMuPDF + edge-tts) e interfaz web interactiva que transforma libros y documentación técnica en audiolibros con limpieza inteligente y seguimiento visual.",
      image: null,
      role: "Arquitectura & Desarrollo Full-Stack Python",
      problem:
        "Convertir libros, manuales de ingeniería y datasheets extensos en formato PDF a audiolibros fluidos sin que los encabezados repetitivos, números de página o palabras cortadas por guion interrumpan la narración.",
      architecture:
        "Backend modular en Python 3.12 con FastAPI, extracción geométrica por coordenadas (bbox) mediante PyMuPDF (fitz), síntesis neuronal con Microsoft Edge TTS y caché SHA-256, acoplado a un reproductor de estudio con PDF.js y modo live en GitHub Pages.",
      features: [
        "Limpieza inteligente por coordenadas: omite encabezados/pies repetidos, números de página y reconstruye palabras con guion.",
        "Reproductor interactivo con vista dividida PDF + Guion, resaltado oración por oración y precarga asíncrona sin pausas.",
        "Control de velocidad (0.5x–2.0x), catálogo de 8 voces neuronales (ES/EN), guardado automático de progreso y exportación a MP3."
      ],
      tags: ["Python 3.12", "FastAPI", "PyMuPDF", "Edge-TTS", "PDF.js"],
      repoUrl: "https://github.com/Edgar-LT/lector-de-pdf",
      demoUrl: "https://edgar-lt.github.io/lector-de-pdf/"
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
        "Python & FastAPI",
        "Desarrollo Multiplataforma",
        "Diseño de Interfaces (UI/UX)",
        "Procesamiento PDF & Síntesis TTS",
        "Gestión de Estado & Persistencia"
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
