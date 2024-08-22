import React from "react";

///Interfaces///
interface WeatherSearchProps {
  city: string;
  setCity: (city: string) => void;
  handleCityChange: () => void;
}

//Componente funcional para la barrera de búsqueda
export default function WeatherSearch({
  city,
  setCity,
  handleCityChange,
}: WeatherSearchProps) {
  //Manejador del evento submit del form
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();//Previene el recargar la pagina
    handleCityChange();// Llama a la función para buscar el clima de la ciudad ingresada.
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Ingrese la ciudad"
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="mb-4 p-2 bg-sky-500 hover:bg-sky-700 rounded w-full"
      >
        Buscar
      </button>
    </form>
  );
}
