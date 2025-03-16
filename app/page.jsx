'use client';

import React from 'react';
import { useState } from 'react';
import styles from "./page.module.css";
import Link from 'next/link';
import Image from 'next/image';


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
      <h2>Around the world</h2>

      <div className={styles.containerLottie}>
        <Image
          src="/weather.gif"
          alt="Icon Weather" 
          width={100} 
          height={100} 
        />
      </div>

      <container className={styles.container}>
      <p>City</p>
      <input className={styles.searchbox}
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button className={styles.button} onClick={fetchWeather}>Check weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <fieldset className={styles.fieldset}>
          <legend>Weather Info</legend>
          <p>City: {weather.name}</p>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </fieldset>
        )}
        </container>
        <footer className={styles.footer}>
          <h3>Designed by <Link href="https://www.connievisualarts.com/">Connie Ramirez</Link></h3> 
        </footer>    
      </div>
  );
}