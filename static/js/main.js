/* Combina la lógica de carrito, dark mode y carrusel */

// --- Carrito (extraído de static/js/carrito.js) ---
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
    // Abrir sidebar al agregar y mostrar carrito actualizado
    const sidebar = document.getElementById('sidebar-carrito');
    if(sidebar && sidebar.classList.contains('translate-x-full')){
        sidebar.classList.remove('translate-x-full');
    }
}

function mostrarNotificacion(nombre) {
    // Implementación simple de notificación (puedes mejorar esto con Tailwind)
    console.log(`${nombre} agregado al carrito.`);
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

// Asegura que el carrito se muestre al abrir el sidebar
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});

// Exponer toggleCarrito para uso inline
function toggleCarrito(){
    const sidebar = document.getElementById('sidebar-carrito');
    if(!sidebar) return;
    sidebar.classList.toggle('translate-x-full');
    // asegurarse de renderizar el carrito cuando se abra
    if(!sidebar.classList.contains('translate-x-full')) mostrarCarrito();
}

// --- Carrusel autoplay ---
document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.getElementById('carrusel-productos');
    if(!carrusel) return;

    let autoInterval = null;
    const scrollAmount = 300;
    const startAutoplay = () => {
        if(autoInterval) return;
        autoInterval = setInterval(() => {
            // si llega al final, volver al inicio suavemente
            if(carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth - 1){
                carrusel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3500);
    };
    const stopAutoplay = () => {
        if(autoInterval){ clearInterval(autoInterval); autoInterval = null; }
    };

    // Inicia autoplay
    startAutoplay();

    // Pausar al hover/focus
    carrusel.addEventListener('mouseenter', stopAutoplay);
    carrusel.addEventListener('focusin', stopAutoplay);
    carrusel.addEventListener('mouseleave', startAutoplay);
    carrusel.addEventListener('focusout', startAutoplay);
});

// --- Dark mode ---
(function(){
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setTheme(name){
        if(name === 'dark'){
            body.classList.add('dark');
            body.classList.remove('light');
            if(themeToggle) themeToggle.classList.add('dark','active');
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            if(themeToggle) themeToggle.classList.remove('dark','active');
        }
    }

    const systemPrefDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    document.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('theme');
        if(saved){
            setTheme(saved);
        } else {
            setTheme(systemPrefDark ? 'dark' : 'light');
        }
    });

    if(themeToggle){
        themeToggle.setAttribute('role','button');
        themeToggle.setAttribute('tabindex','0');
        themeToggle.addEventListener('click', toggle);
        themeToggle.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    }

    function toggle(){
        const isDark = body.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
        try{ localStorage.setItem('theme', next); } catch(e){}
    }
})();

// --- Carrusel (extraído de index.html) ---
function scrollCarrusel(direction) {
    const carrusel = document.getElementById('carrusel-productos');
    if (!carrusel) return;
    const scrollAmount = 300;
    carrusel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

