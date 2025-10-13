document.addEventListener('DOMContentLoaded', () => {
  console.log("Pagos cargado");
  const opciones = document.querySelectorAll('.payment-option');
  opciones.forEach(op => op.classList.add('fade-in'));
});
