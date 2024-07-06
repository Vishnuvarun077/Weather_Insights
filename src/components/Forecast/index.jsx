// Forecast.js
import React from "react";
import { getWeatherIcon } from "../utils";
import { motion } from "framer-motion";



export default function Forecast({ data, unit }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <motion.div
      className="forecast"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>5-Day Forecast</h2>
      <div className="forecast-items">
        {data.list.filter((item, index) => index % 8 === 0).map((item, index) => (
          <motion.div
            key={index}
            className="forecast-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <p>{new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: 'short' })}</p>
            <img src={getWeatherIcon(item.weather[0].icon)} alt={item.weather[0].description} />
            <p>{Math.round(item.main.temp)}{tempUnit}</p>
            <a href={`https://www.accuweather.com/en/search-locations?query=${data.city.name}`} target="_blank" rel="noopener noreferrer" className="forecast-link">
              Detailed Forecast
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
// export default function Forecast({ data, unit }) {
//   const tempUnit = unit === "metric" ? "°C" : "°F";

//   return (
//     <div className="forecast">
//       <h2>5-Day Forecast</h2>
//       <div className="forecast-items">
//         {data.list.filter((item, index) => index % 8 === 0).map((item, index) => (
//           <div key={index} className="forecast-item">
//             <p>{new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: 'short' })}</p>
//             <img src={getWeatherIcon(item.weather[0].icon)} alt={item.weather[0].description} />
//             <p>{Math.round(item.main.temp)}{tempUnit}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }