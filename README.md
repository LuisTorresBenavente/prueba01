# Carnicería Pochito — Proyecto web

Mejoras aplicadas:

- Refactor de `app.py` usando patrón `create_app()`.
- Cabeceras de seguridad básicas añadidas.
- Manejadores de errores 404/500 añadidos (plantillas `404.html` y `500.html` esperadas).
- Extracción de JavaScript a `static/js/site.js` (carrito, tema, helpers).
- `package.json` con scripts para compilar Tailwind CSS.
- `requirements.txt` con dependencias mínimas.

Cómo probar localmente (Windows PowerShell):

```powershell
# Instalar dependencias (recomendado en virtualenv)
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Generar CSS con Tailwind (requiere Node.js instalado)
npm install
npm run build:css

# Iniciar la app
python app.py
```

Notas y siguientes pasos:

- Añadir `404.html` y `500.html` en `templates/` para mejorar UX.
- Considerar usar Gunicorn/Waitress para producción.
- Añadir tests básicos y linters (black, isort, flake8).
