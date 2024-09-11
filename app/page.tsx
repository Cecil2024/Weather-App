
'use client';
import { useState } from 'react';
import styles from "./page.module.css";
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const fetchWeather = async () => {
    if (!city) return;
    const apiKey = 'b42d26f2e8309b4ccb80ff116edbf491';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };
  return (
    <div className={styles.page}>
      <h1>Weather App</h1>
      <p>Select city</p>
      <input className={styles.searchbox}
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button className={styles.button} onClick={fetchWeather}>Send</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <fieldset>
          <legend>Weather Info</legend>
          <p>City: {weather.name}</p>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </fieldset>
      )}
    </div>
  );
}