
import React, { useEffect, useState } from "react";
import Search from "../search";
import CurrentWeather from "../CurrentWeather";
import Forecast from "../Forecast";
import { fetchWeatherData, fetchForecastData } from "../api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useLocalStorage("unit", "metric");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [lastSearched, setLastSearched] = useLocalStorage("lastSearched", "");
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setBgImage(hour >= 6 && hour < 20 
      ? "https://source.unsplash.com/1600x900/?sunny,day"
      : "https://source.unsplash.com/1600x900/?night,stars");
  }, []);

  useEffect(() => {
    if (lastSearched) {
      handleSearch(lastSearched);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  async function handleSearch(searchTerm) {
    setLoading(true);
    setError(null);
    try {
      const weather = await fetchWeatherData(searchTerm, unit);
      setWeatherData(weather);
      const forecast = await fetchForecastData(searchTerm, unit);
      setForecastData(forecast);
      setLastSearched(searchTerm);
    } catch (err) {
      console.error("Search error:", err);
      setError(`Error fetching weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleUnitToggle() {
    setUnit(prevUnit => prevUnit === "metric" ? "imperial" : "metric");
  }

  useEffect(() => {
    if (weatherData) {
      handleSearch(weatherData.name);
    }
  }, [unit]);

  return (
    <div className={`weather-app ${darkMode ? 'dark' : 'light'}`} style={{backgroundImage: `url(${bgImage})`}}>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Weather Insights</h1>
        <div className="header-buttons">
          <motion.button
            className="mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>
          <motion.button
            className="unit-toggle"
            onClick={handleUnitToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Switch to {unit === "metric" ? "°F" : "°C"}
          </motion.button>
        </div>
      </motion.header>
      <Search
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.div>
        )}
        {error && (
          <motion.div
            className="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}
        {weatherData && !loading && !error && (
          <CurrentWeather data={weatherData} unit={unit} />
        )}
        {forecastData && !loading && !error && (
          <Forecast data={forecastData} unit={unit} />
        )}
      </AnimatePresence>
    </div>
  );
}
