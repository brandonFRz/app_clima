import React from "react";
import { CurrentWeatherData } from "../types/weather";

///Interfaces///
interface CurrentWeatherProps {
  currentWeather: CurrentWeatherData | null;
}

//Componente que muestra el clima actual.
export default function CurrentWeather({
  currentWeather,
}: CurrentWeatherProps) {
  if (!currentWeather) {
    return null;
  }

  return (
    <div className="text-center">
      <h2 className="font-mono text-2xl font-bold">{currentWeather.name}</h2>
      <div className="flex-col justify-center mb-4">
        <img
        className="mx-auto"
          src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          width={100}
          height={100}
        />
      </div>
      <p className="text-4xl ">{Math.round(currentWeather.main.temp)}°C</p>
      <p className="mb-4 font-bold capitalize">{currentWeather.weather[0].description}</p>
      <p>Sensación: {Math.round(currentWeather.main.feels_like)}°C</p>
      <p>Humedad: {currentWeather.main.humidity}%</p>
      <p>Viento: {currentWeather.wind.speed} k/h</p>
    </div>
  );
}
