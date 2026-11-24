// MaquillArte — interacciones de la página

document.addEventListener("DOMContentLoaded", () => {
  // Menú en celular
  const botonMenu = document.querySelector(".boton-menu");
  const menu = document.querySelector(".menu");

  if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", abierto);
    });
  }

  // Aviso "En construcción..." para el botón Talleres
  const fondoAviso = document.querySelector(".aviso-fondo");
  const botonCerrar = document.querySelector(".aviso-cerrar");

  const abrirAviso = (evento) => {
    evento.preventDefault();
    fondoAviso.classList.add("visible");
    fondoAviso.setAttribute("aria-hidden", "false");
    botonCerrar.focus();
    if (menu) {
      menu.classList.remove("abierto");
      botonMenu && botonMenu.setAttribute("aria-expanded", "false");
    }
  };

  const cerrarAviso = () => {
    fondoAviso.classList.remove("visible");
    fondoAviso.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll("[data-talleres]").forEach((enlace) => {
    enlace.addEventListener("click", abrirAviso);
  });

  if (fondoAviso) {
    botonCerrar.addEventListener("click", cerrarAviso);
    fondoAviso.addEventListener("click", (e) => {
      if (e.target === fondoAviso) cerrarAviso();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarAviso();
    });
  }

  // Animación suave al aparecer las secciones
  const elementos = document.querySelectorAll(".aparecer");
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });
    elementos.forEach((el) => observador.observe(el));
  } else {
    elementos.forEach((el) => el.classList.add("visible"));
  }
});
