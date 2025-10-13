document.addEventListener('DOMContentLoaded', () => {
  console.log("Carrito cargado");
  const items = document.querySelectorAll('.cart-item');
  items.forEach(item => item.classList.add('fade-in'));
  const botones = document.querySelectorAll('.btn-eliminar');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.cart-item').remove();
    });
  });
});
