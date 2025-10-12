from flask import Flask, render_template, url_for
from datetime import datetime

app = Flask(__name__)


# Seguridad: cabeceras que ayudan a mitigar ataques comunes (sin crear archivos nuevos)
@app.after_request
def set_security_headers(response):
    # Protecciones basicas recomendadas
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['Referrer-Policy'] = 'no-referrer-when-downgrade'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

# --- PROCESADOR DE CONTEXTO ---
@app.context_processor
def inject_globals():
    """
    Inyecta la función 'now' para acceder a la fecha y hora actuales en Jinja.
    """
    return {
        'now': datetime.utcnow
    }

# --- RUTAS PRINCIPALES ---

@app.route('/')
def index():
    return render_template('index.html')

# RUTA: Todas las carnes (Vista combinada)
@app.route('/todas-las-carnes')
def productos_carnes():
    return render_template('productos_carnes.html')

# RUTA PARA UTENSILIOS (¡CORREGIDO! Apunta al nuevo nombre del archivo)
@app.route('/todos-para-asar')
def utensilios():
    return render_template('todos_para_asar.html') 

@app.route('/categorias')
def categorias():
    return render_template('categorias.html')

@app.route('/acerca-de')
def acerca_de():
    return render_template('acerca_de.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/pago')
def pago():
    return render_template('pago.html')


# Pequeño endpoint para comprobar que la app está viva (útil para debugging/local)
@app.route('/health')
def health():
    return 'ok', 200


# --- RUTAS DE CATEGORÍA ESPECÍFICAS ---

@app.route('/carne-de-res')
def categoria_res():
    # CORRECCIÓN FINAL: Apunta a 'res.html'
    return render_template('res.html')

@app.route('/carne-de-pollo')
def categoria_pollo():
    # Apunta a 'pollo.html'
    return render_template('pollo.html')

@app.route('/carne-de-cerdo')
def categoria_cerdo():
    # Apunta a 'cerdo.html'
    return render_template('cerdo.html')


if __name__ == '__main__':
    # Mantener debug=True solo para desarrollo local
    app.run(debug=True)