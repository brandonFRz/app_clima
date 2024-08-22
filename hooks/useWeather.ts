import { useState, useEffect } from "react";
import { fetchCurrentWeather,fetchForecast,fetchCityByCoordinates,} from "../utils/api";
import { CurrentWeatherData,ForecastData, ForecastDay,} from "../types/weather";

export function useWeather() {
  //Estado que almacenar los datos del clima actual.
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);
  //Estado que almacenar los datos del clima de los próximos días.
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  //Estado que alacena el nombre de la ciudad.
  const [city, setCity] = useState<string>("");
  //Estado que almacena la ubicación geográfica en base a la latitud y longitud.
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  //Estado que maneja los estados de carga.
  const [loading, setLoading] = useState<boolean>(true);
  //Estado que maneja los errores en la obtención de datos
  const [error, setError] = useState<Error | null>(null);

  //Hook que obtiene la ubicación del usuario cuando el componente se monta.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      });
    }
  }, []);

  //Hook que obtiene el clima actual y en los próximos días en base a la ubicación.
  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchCityByCoordinates(location.lat, location.lon)
        .then((defaultCity) => {
          fetchCurrentWeather(defaultCity)
            .then((data) => setCurrentWeather(data))
            .catch((error) => setError(error));
          fetchForecast(defaultCity)
            .then((data) => setForecast(data))
            .catch((error) => setError(error));
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [location]);

  //Función que maneja los cambios de la ciudad ingresada por el usuario.
  function handleCityChange() {
    setLoading(true);
    setError(null);
    fetchCurrentWeather(city)
      .then((data) => setCurrentWeather(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
    fetchForecast(city)
      .then((data) => setForecast(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }

  //Función para obtener el pronostico diario basado en los datos recibidos.
  function getDailyForecasts(forecastData: ForecastData): ForecastDay[] {
    const dailyForecasts: ForecastDay[] = [];
    const forecastMap = new Map<string, ForecastDay>();

    // Mapea los datos del pronóstico agrupándolos por fecha
    forecastData.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString("es-ES");
      if (!forecastMap.has(date)) {
        forecastMap.set(date, entry);
      }
    });

    // Convierte el mapa en un array y lo recorta a los primeros 5 días
    forecastMap.forEach((value) => {
      dailyForecasts.push(value);
    });

    return dailyForecasts.slice(0, 5);
  }

  //Retorna los valores y las funciones que estaran disponibles para los componentes que las usen.
  return {
    currentWeather,
    forecast,
    city,
    setCity,
    handleCityChange,
    getDailyForecasts,
    error,
    isloading: loading,
  };
}
