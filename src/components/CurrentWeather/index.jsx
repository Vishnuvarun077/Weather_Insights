// CurrentWeather.js
import React from "react";
import { getWeatherIcon } from "../utils";
import { motion } from "framer-motion";

export default function CurrentWeather({ data, unit }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <motion.div
      className="current-weather"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{data.name}, {data.sys.country}</h2>
      <p>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div className="temperature">
        <img src={getWeatherIcon(data.weather[0].icon)} alt={data.weather[0].description} />
        <h1>{Math.round(data.main.temp)}{tempUnit}</h1>
      </div>
      <p>{data.weather[0].description}</p>
      <div className="details">
        <p>Feels like: {Math.round(data.main.feels_like)}{tempUnit}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} {windUnit}</p>
      </div>
      <a href={`https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`} target="_blank" rel="noopener noreferrer" className="map-link">
        View on Map
      </a>
    </motion.div>
  );
}

// export default function CurrentWeather({ data, unit }) {
//   const tempUnit = unit === "metric" ? "°C" : "°F";
//   const windUnit = unit === "metric" ? "m/s" : "mph";

//   return (
//     <div className="current-weather">
//       <h2>{data.name}, {data.sys.country}</h2>
//       <p>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//       <div className="temperature">
//         <img src={getWeatherIcon(data.weather[0].icon)} alt={data.weather[0].description} />
//         <h1>{Math.round(data.main.temp)}{tempUnit}</h1>
//       </div>
//       <p>{data.weather[0].description}</p>
//       <div className="details">
//         <p>Feels like: {Math.round(data.main.feels_like)}{tempUnit}</p>
//         <p>Humidity: {data.main.humidity}%</p>
//         <p>Wind: {data.wind.speed} {windUnit}</p>
//       </div>
//     </div>
//   );
// }