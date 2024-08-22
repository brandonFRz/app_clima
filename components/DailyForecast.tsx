import React from 'react';
import { ForecastDay } from '../types/weather';

///Interfaces///
interface DailyForecastProps {
  forecast: ForecastDay[];
}

//Componente que muestra el pronostico de los siguientes 5 días.
const DailyForecast = ({ forecast }:DailyForecastProps) => {
  return (
    <>
      <h2 className="font-mono text-2xl font-bold mb-8">Clima en los próximos 5 días</h2>
      {/* Contenedor principal que organiza los días */}
      <div className=" flex flex-wrap justify-center gap-5">
        {forecast.map((day, index) => (
          <div key={index} className=" bg-white bg-opacity-70 p-4 rounded-lg shadow-md text-center">
            <p className="font-bold">{new Date(day.dt * 1000).toLocaleDateString("es-ES")}</p>
            <div className="flex justify-center my-2">
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather icon"
                width={64}
                height={64}
              />
            </div>
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className='mb-4 font-bold capitalize'>{day.weather[0].description}</p>
            <p>Viento: {day.wind?.speed} km/h</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DailyForecast;
