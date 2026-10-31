# Edgar López // Portafolio Profesional

Portafolio web profesional de **Edgar López** — Estudiante de **Ingeniería Mecatrónica** y **Desarrollador Web y de Aplicaciones** en Caracas, Venezuela.

🌐 **Demo en Vivo:** [https://edgar-lt.github.io/portafolio/](https://edgar-lt.github.io/portafolio/)

---

## 🚀 Enfoque: La Tríada Tecnológica
1. **Ingeniería Mecatrónica & Sistemas Embebidos:** Integración de electrónica, sensores, actuadores, control y automatización.
2. **Desarrollo Web Full-Stack:** Interfaces web modernas, responsivas y orientadas al rendimiento.
3. **Desarrollo de Aplicaciones:** Soluciones móviles y multiplataforma conectadas.

---

## 🏗️ Arquitectura Modular del Proyecto

El código sigue una arquitectura **Data-Driven** con separación de responsabilidades para facilitar la escalabilidad y el mantenimiento continuo:

```text
portafolio/
├── index.html             # Estructura semántica HTML5, metadatos SEO & Open Graph
├── css/
│   └── styles.css         # Estilos Kinetic Precision (glassmorphism, animaciones, grid)
├── js/
│   ├── config.tailwind.js # Tokens de diseño (colores, tipografía, espaciados)
│   ├── data.js            # Fuente única de datos (Proyectos, Stack y Trayectoria)
│   └── main.js            # Renderizado dinámico, filtros, Modal de Ficha Técnica y eventos
├── assets/                # Imágenes locales optimizadas y favicon SVG
└── DESIGN.md              # Especificación completa del sistema de diseño
```

### ¿Cómo agregar o editar un proyecto o habilidad?
Toda la información de proyectos, lenguajes y trayectoria está centralizada en [`js/data.js`](./js/data.js):
- **`projects`:** Agrega un objeto al arreglo para crear automáticamente su tarjeta en el grid y su **Modal de Ficha Técnica de Ingeniería** (*Problema & Reto*, *Arquitectura & Solución*, *Características Clave*).
- **`skillCategories`:** Actualiza los lenguajes, herramientas y niveles técnicos (`Avanzado`, `Intermedio`, `En Formación`).
- **`timeline`:** Actualiza los hitos académicos y profesionales.

---

## 📬 Contacto
- **Correo:** [Socialedgar0710@gmail.com](mailto:Socialedgar0710@gmail.com)
- **GitHub:** [github.com/Edgar-LT](https://github.com/Edgar-LT)
- **WhatsApp:** [+58 412-9640005](https://wa.me/584129640005)
