# Imágenes de Proyectos (`assets/projects/`)

Coloca en esta carpeta las capturas de pantalla o fotos de tus proyectos (`.webp`, `.png` o `.jpg`, preferiblemente en proporción `16:9` como `1280x720`).

Luego, en `js/data.js`, actualiza la propiedad `image` del proyecto correspondiente:

```javascript
image: "assets/projects/mi-aplicacion.png",
```

Al hacerlo, el recuadro superior de la tarjeta mostrará automáticamente tu imagen dentro del marco de ventana (y también aparecerá al abrir la ficha del proyecto). Si dejas `image: null`, se mostrará la vista técnica por defecto.
