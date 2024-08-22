//Describe la estructura sobre la información del clima
export interface WeatherDescription {
  description: string;
  icon: string;
}

//Describe la estructura de la información principal del clima
export interface Main {
  temp: number;
  feels_like: number; 
  humidity?: number; 
}

//Describe la estructura de la información sobre el viento
export interface Wind {
  speed: number;
}

// Estructura de los datos del clima actual
export interface CurrentWeatherData {
  name: string;
  weather: WeatherDescription[]; 
  main: Main;
  wind: Wind;
}

// Estructura para un día específico del pronóstico del clima
export interface ForecastDay {
  dt: number;
  main: Main;
  weather: WeatherDescription[]; 
  wind?: Wind; 
}

// Estructura de los datos de los próximos días
export interface ForecastData {
  list: ForecastDay[];
}
