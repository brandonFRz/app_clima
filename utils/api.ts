import axios from "axios";

//Clave API de las variables de entorno
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

//Verifica si la clave de la API esta presente, de lo contrario lanza un error.
if (!API_KEY) {
  throw new Error("No se encuentra api key de OpenWeather ");
}

function handleApiError(error:any):string{
  console.error('Error al buscar la información', error)
  return('Hubo un problema al intentar buscar los datos del clima. Por favor intente nuevamente.')
}

//Función para obtener el clima actual de una ciudad especifica.
export async function fetchCurrentWeather(city: string) {
  try {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sp`;
  const response = await axios.get(url);
  return response.data;
  }catch(error){
    throw new Error(handleApiError(error));
  }
};

//Función para obtener el clima en los próximos días según la ciudad especifica.
export async function fetchForecast(city: string) {
  try {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=sp`;
  const response = await axios.get(url);
  return response.data;
} catch (error) {
  throw new Error(handleApiError(error));
}
};

//Función que obtiene el nombre de la ciudad basándose en sus coordenadas.
export async function fetchCityByCoordinates(lat: number, lon: number) {
  try {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sp`;
  const response = await axios.get(url);
  return response.data.name;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

