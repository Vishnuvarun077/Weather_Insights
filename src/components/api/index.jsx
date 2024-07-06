// api.js
// const API_KEY = "e34b4c51d8c2b7bf48d5217fe52ff79e";
const API_KEY = "72fef618301507664f96fdb7a4a87417";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherData(query, unit = "metric") {
  const response = await fetch(
    `${BASE_URL}/weather?q=${query}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Weather data not found");
  }
  return response.json();
}

export async function fetchForecastData(query, unit = "metric") {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${query}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Forecast data not found");
  }
  return response.json();
}