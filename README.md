# Portafolio de Natalia

Sitio web estático para publicar con GitHub Pages.

## Archivos
- `index.html`: contenido y secciones del portafolio.
- `styles.css`: colores, tipografías y diseño adaptable.
- `script.js`: menú móvil y año automático.
- `assets/`: carpeta para fotografías y otros recursos.

## Personalización antes de publicar
1. Abre `index.html` y cambia los textos de ejemplo por tu información definitiva.
2. Reemplaza `tu-correo@ejemplo.com` por el correo profesional que quieras publicar.
3. Cambia los enlaces `href="#"` por tus perfiles reales (LinkedIn, Google Scholar y GitHub). Si no tienes alguno, elimina ese icono.
4. Añade tu foto en `assets/foto-perfil.jpg`. Para mostrarla, reemplaza el bloque `<div class="portrait-placeholder"...>` de `index.html` por:
   `<img class="portrait-photo" src="assets/foto-perfil.jpg" alt="Retrato profesional de Natalia">`
5. Si utilizas la foto, agrega al final de `styles.css`:
   `.portrait-photo { width: min(290px, 75vw); aspect-ratio: 1; object-fit: cover; border-radius: 50%; border: 9px solid white; box-shadow: 0 18px 55px #00000012; }`
6. Revisa que las publicaciones y proyectos sean verificables y que tengas autorización para publicar documentos, imágenes o datos.

## Publicar con GitHub Pages
1. Crea una cuenta en https://github.com si aún no tienes una.
2. Crea un repositorio público llamado exactamente `TUUSUARIO.github.io` (reemplaza TUUSUARIO por tu nombre de usuario de GitHub).
3. Sube `index.html`, `styles.css`, `script.js` y la carpeta `assets` a la raíz del repositorio.
4. En el repositorio, entra a **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Selecciona la rama `main` y la carpeta `/(root)`, y pulsa **Save**.
7. Espera unos minutos y visita `https://TUUSUARIO.github.io`.

