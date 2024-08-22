# Weather Forecast Application 🌦️

## Descripción

Esta es una aplicación de pronóstico del tiempo desarrollada con **Next.js** y **Axios**. La aplicación permite a los usuarios obtener el clima actual y el pronóstico de los próximos 5 días para cualquier ciudad del mundo, utilizando la API de OpenWeatherMap.

## Características

- 🌍 **Clima actual**: Muestra la temperatura, la sensación térmica, la humedad, y la velocidad del viento de la ciudad seleccionada.
- 📅 **Pronóstico de 5 días**: Proporciona el pronóstico del clima para los próximos 5 días, incluyendo la descripción del clima y la temperatura.
- 🔍 **Búsqueda de ciudades**: Permite a los usuarios buscar el clima de cualquier ciudad.
- 📍 **Detección de ubicación**: Utiliza la geolocalización para obtener automáticamente el clima de la ubicación actual del usuario.

## Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework de React para aplicaciones web.
- [Axios](https://axios-http.com/) - Cliente HTTP para hacer solicitudes a la API.
- [OpenWeatherMap API](https://openweathermap.org/api) - API para obtener datos meteorológicos.

## Instalación y Uso

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/weather-forecast-app.git
cd weather-forecast-app
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui
```

### 4. Inicia la aplicación
```bash
npm run dev
```
Luego abre http://localhost:3000 en tu navegador para ver la aplicación.

## Vista Previa
Aquí hay una vista previa de cómo se ve la aplicación:

<img src="https://github.com/user-attachments/assets/b51d0b60-764c-402a-b5d5-a5b84563c444" alt="clima" width="500"/>



