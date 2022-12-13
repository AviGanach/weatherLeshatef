// const webpack = require('webpack');
// const dotenv = require('dotenv');
const getWeatherByFile = async (city) => {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
    );
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching weather");
  }
};
export default getWeatherByFile;
