const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Fondo de constelaciones lila (interactivo) ===== */
(() => {
  const canvas = document.getElementById("constelacion");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  // De lila oscuro a lila claro
  const TONOS = ["#3f2a6b", "#5b3f8c", "#7a5cb0", "#9b7fd0", "#b79be0", "#d3c0f0"];
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RADIO_MOUSE = 140;   // distancia a la que el cursor/dedo empuja los puntos
  const DIST_LINEA = 120;    // distancia máxima para dibujar una línea
  let w, h, puntos = [], puntero = { x: -9999, y: -9999 };

  const crearPunto = (x, y) => ({
    x: x ?? Math.random() * w,
    y: y ?? Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 2.6 + 1,
    color: TONOS[Math.floor(Math.random() * TONOS.length)],
  });

  function ajustar() {
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cantidad = Math.min(110, Math.floor((w * h) / 15000));
    puntos = Array.from({ length: cantidad }, () => crearPunto());
  }

  function dibujar() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < puntos.length; i++) {
      const p = puntos[i];
      // Reacción al cursor o al dedo: los puntos se alejan
      const dx = p.x - puntero.x, dy = p.y - puntero.y, d = Math.hypot(dx, dy);
      if (d < RADIO_MOUSE && d > 0) {
        const fuerza = (RADIO_MOUSE - d) / RADIO_MOUSE;
        p.x += (dx / d) * fuerza * 3;
        p.y += (dy / d) * fuerza * 3;
      }
      if (!reducirMovimiento) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Líneas hacia puntos cercanos
      for (let j = i + 1; j < puntos.length; j++) {
        const q = puntos[j], dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < DIST_LINEA) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / DIST_LINEA) * 0.35;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reducirMovimiento) requestAnimationFrame(dibujar);
  }

  const mover = (x, y) => { puntero.x = x; puntero.y = y; };
  window.addEventListener("mousemove", (e) => mover(e.clientX, e.clientY));
  window.addEventListener("touchmove", (e) => mover(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener("touchend", () => mover(-9999, -9999));
  window.addEventListener("mouseout", () => mover(-9999, -9999));
  // Al hacer clic o tocar, aparecen nuevos puntos
  window.addEventListener("click", (e) => {
    for (let i = 0; i < 4; i++) puntos.push(crearPunto(e.clientX, e.clientY));
    if (puntos.length > 180) puntos.splice(0, 4);
    if (reducirMovimiento) dibujar();
  });
  window.addEventListener("resize", () => { ajustar(); if (reducirMovimiento) dibujar(); });

  ajustar();
  dibujar();
})();
