let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarNotificacion(nombre);
    mostrarCarrito();
}

function mostrarNotificacion(nombre) {
    // Implementación simple de notificación (puedes mejorar esto con Tailwind)
    console.log(`${nombre} agregado al carrito.`);
    // Opcional: Mostrar un mensaje temporal en la pantalla
}

function mostrarCarrito() {
    const lista = document.getElementById('carrito-lista');
    if (!lista) return;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-gray-500">El carrito está vacío.</p>';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="flex justify-between items-center py-2 border-b last:border-b-0">
                <div class="flex-1">
                    <p class="font-semibold text-sm">${item.nombre}</p>
                    <p class="text-xs text-gray-500">S/. ${item.precio.toFixed(2)} x ${item.cantidad}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-sm">S/. ${subtotal.toFixed(2)}</p>
                    <button onclick="cambiarCantidad(${item.id}, -1)" class="text-gray-600 hover:text-red-600 mr-2">-</button>
                    <button onclick="cambiarCantidad(${item.id}, 1)" class="text-gray-600 hover:text-green-600">+</button>
                    <button onclick="eliminarDelCarrito(${item.id})" class="text-red-600 hover:text-red-800 ml-2 text-xs">x</button>
                </div>
            </div>
        `;
    });

    html += `
        <div class="mt-4 pt-4 border-t-2 border-red-200 flex justify-between items-center">
            <span class="font-bold text-lg">Total:</span>
            <span class="font-bold text-lg text-red-600">S/. ${total.toFixed(2)}</span>
        </div>
    `;

    lista.innerHTML = html;
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Asegura que el carrito se muestre al abrir el sidebar (llamado desde base.html)
document.addEventListener('DOMContentLoaded', () => {
    // La función mostrarCarrito es llamada dentro de toggleCarrito en base.html
});