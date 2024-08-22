"use client";
import { useWeather } from "../hooks/useWeather";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import WeatherSearch from "../components/WeatherSearch";

function Weather() {
  // Utiliza el custom hook para manejar los estados y lógica relacionada con el clima
  const {
    currentWeather, //Estado que almacena el clima actual.
    forecast, //Estado que almacena el pronostico diario
    city, // Estado que almacena la ciudad ingresada por el usuario
    setCity, // Función para actualizar el estado de la ciudad
    handleCityChange, // Función para manejar los cambios en la entrada de la ciudad
    getDailyForecasts, // Función que extrae el pronóstico diario
    isloading, // Estado que indica si la información está cargando
    error, // Estado que almacena errores si los hay
  } = useWeather();

  return (
    <div className="flex flex-col my-20 items-center bg-cover bg-center min-h-screen font-sans">
      <div className="w-full max-w-8xl p-8 bg-white bg-opacity-60 rounded-lg shadow-lg flex justify-between">
        <div className="flex-1/3 p-4 border-r border-gray-300 flex flex-col items-center">
          {/* Sección izquierda: Buscador */}
          <WeatherSearch
            city={city} // Pasa el estado de la ciudad al componente de búsqueda
            setCity={setCity} // Pasa la función para actualizar la ciudad al componente de búsqueda
            handleCityChange={handleCityChange} // Pasa la función para manejar cambios en la entrada de la ciudad
          />
          {/* Muestra un mensaje correspondiente si esta cargando, si hay un error o el clima actual obtenido */}
          {isloading && <p className="text-center">Cargando...</p>}
          {error && <p className="text-red-500 text-center">{error.message}</p>}
          {currentWeather && <CurrentWeather currentWeather={currentWeather} />}
        </div>
        {/* Sección derecha: Pronóstico diario */}
        <div className="flex-1 p-4 flex flex-col items-center">
          {forecast && <DailyForecast forecast={getDailyForecasts(forecast)} />}
        </div>
      </div>
    </div>
  );
}

export default Weather;
