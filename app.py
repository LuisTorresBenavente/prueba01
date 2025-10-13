from flask import Flask, render_template, url_for
import os
from datetime import datetime

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/")
def index():
    ruta = os.path.join(app.static_folder, 'image')
    productos = [
        url_for('static', filename=f'image/{img}')
        for img in os.listdir(ruta)
        if img.lower().endswith(('.jpg', '.jpeg', '.png')) and 'fachada' not in img.lower()
    ]
    return render_template("index.html", productos=productos, year=datetime.now().year)

@app.route("/carrito")
def carrito():
    return render_template("carrito.html", year=datetime.now().year)

@app.route("/login")
def login():
    return render_template("login.html", year=datetime.now().year)

@app.route("/pagos")
def pagos():
    return render_template("pagos.html", year=datetime.now().year)

@app.route("/productos")
def productos():
    lista_productos = [
        {
            "nombre": "Lomo Fino",
            "precio": 38.90,
            "descripcion": "Carne tierna ideal para parrillas.",
            "imagen": url_for('static', filename='image/lomo_fino.jpg')
        },
        {
            "nombre": "Asado de Tira",
            "precio": 28.50,
            "descripcion": "Perfecto para guisos o estofados.",
            "imagen": url_for('static', filename='image/asado_tira.jpg')
        },
        {
            "nombre": "Bistec de Res",
            "precio": 25.00,
            "descripcion": "Corte clásico para plancha o sartén.",
            "imagen": url_for('static', filename='image/bistec_res.jpg')
        }
    ]
    return render_template("producto.html", productos=lista_productos, year=datetime.now().year)

@app.route("/register", methods=["POST"])
def register():
    # Aquí puedes procesar el formulario de registro más adelante
    return "Registro recibido"

if __name__ == "__main__":
    app.run(debug=True)
