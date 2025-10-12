from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Ruta principal que redirige al inicio
@app.route('/')
def index():
    return redirect(url_for('inicio'))

# 1. Página de Inicio (Imagen 1)
@app.route('/inicio')
def inicio():
    return render_template('inicio.html')

# 2. Página de Cartas (Imagen 2)
@app.route('/nuestra-carta')
def cartas():
    return render_template('cartas.html')

# 3. Página de Historia (Imagen 3)
@app.route('/nuestra-historia')
def historia():
    return render_template('historia.html')

# 4. Página de Formulario (Delivery, Reservaciones y Suscríbete - Imagen 4)
# Se accede con GET y procesa el envío con POST (Unéte ahora)
@app.route('/formulario', methods=['GET', 'POST'])
def formulario():
    if request.method == 'POST':
        # Procesamiento de datos (simulado):
        print("Datos de suscripción recibidos:", request.form)
        # Redirige a la confirmación de suscripción
        return redirect(url_for('confirmar_suscripcion'))
    return render_template('formulario.html')

# 5. Página de Confirmación (Únete ahora - Imagen 5)
@app.route('/suscripcion-exitosa')
def confirmar_suscripcion():
    return render_template('confirmacion_suscripcion.html')

if __name__ == '__main__':
    # Ejecuta el servidor en modo depuración (DEBUG=True)
    app.run(debug=True)