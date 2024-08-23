import { useState, useEffect, useCallback } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchCityByCoordinates,
} from "../utils/api";
import {
  CurrentWeatherData,
  ForecastData,
  ForecastDay,
} from "../types/weather";

export function useWeather() {
  // Estado para almacenar el clima actual, el pronóstico, la ciudad, la ubicación, el estado de carga y posibles errores.
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Efecto para obtener la ubicación actual del usuario al cargar la página.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude }); // Guardar las coordenadas de la ubicación.
      });
    }
  }, []);

  // Función para obtener el clima actual y el pronóstico para una ciudad específica.
  async function fetchWeatherDataByCity(city: string) {
    try {
      setError(null);
      const [CurrentWeatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrentWeather(CurrentWeatherData);
      setForecast(forecastData);
    } catch (error: any) {
      setError(error.message || "Error buscando los datos del clima");
    } finally {
      setLoading(false);
    }
  }

  // Función para obtener el clima y el pronóstico según la ubicación actual del usuario.
  const fetchWeatherDataByLocation = useCallback(
    async (lat: number, lon: number) => {
      try {
        setLoading(true);
        const cityName = await fetchCityByCoordinates(lat, lon);
        await fetchWeatherDataByCity(cityName);
      } catch (error: any) {
        setError(error.message || "Error buscando los datos del clima");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Efecto para obtener el clima y el pronóstico cuando se obtiene la ubicación.
  useEffect(() => {
    if (location) {
      fetchWeatherDataByLocation(location.lat, location.lon);
    }
  }, [location, fetchWeatherDataByLocation]);

  // Función para manejar cambios en la ciudad seleccionada por el usuario.
  function handleCityChange() {
    fetchWeatherDataByCity(city);
  }

  // Función para obtener los pronósticos diarios.
  function getDailyForecasts(forecastData: ForecastData): ForecastDay[] {
    const forecastMap = new Map<string, ForecastDay>();

    // Iterar sobre la lista de pronósticos y guardar los pronósticos por día.
    forecastData.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString("es-ES");
      if (!forecastMap.has(date)) {
        forecastMap.set(date, entry);
      }
    });

    // Retornar los primeros 5 días.
    return Array.from(forecastMap.values()).slice(0, 5);
  }

  // Retornar el estado y funciones para ser utilizados en los componentes.
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
