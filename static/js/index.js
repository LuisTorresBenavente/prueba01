document.addEventListener('DOMContentLoaded', () => {
  console.log("Página principal cargada");
  const productos = document.querySelectorAll('.product-card');
  productos.forEach(p => p.classList.add('fade-in'));
});
