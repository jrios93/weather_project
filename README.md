
# 🌤️ Weather App con Vue

Este es un proyecto sencillo que hice usando Vue 3 y Vite. Permite buscar el clima actual de una ciudad usando la API de OpenWeatherMap.

## 🔍 ¿Qué hace esta aplicación?

- Puedes escribir el nombre de una ciudad.
- Al hacer clic en el botón, se muestra:
  - El nombre de la ciudad.
  - La temperatura en grados Celsius.
  - Un mensaje según el clima:
    - Menos de 10°C: Hace frío 🧥
    - Entre 10°C y 25°C: Clima templado 🌤
    - Más de 25°C: Hace calor ☀️

También intento manejar errores si la API no responde, y tengo pensado usar otra API si falla.

## ⚙️ Cómo instalar

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/weather-project.git
cd weather-project
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz y pon tu API key de OpenWeatherMap:

```env
VITE_WEATHER_API_KEY=tu_clave_aqui
```

## ▶️ Cómo correr la app

```bash
npm run dev
```

Y abre en tu navegador: [http://localhost:5173/weather](http://localhost:5173/weather)

## 🧾 Estructura del proyecto

- `/components/WeatherDataComponent.vue`: muestra los datos del clima
- `/views/WeatherView.vue`: vista principal de la ruta `/weather`
- `/router/index.js`: define las rutas
- `constant.js`: contiene la URL base
- `.env`: tu clave de API (no se sube a GitHub)

## 💡 Cosas que me gustaría agregar

- Mejor diseño para móviles
- Opción para usar geolocalización
- Pruebas con Vitest
- Agregar una segunda API si la primera falla

Gracias por revisar mi proyecto 🙂
