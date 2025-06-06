import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import slunicko_icon from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import vitr from '../assets/vitr.png';
import adam from '../assets/adam.png';
import mara from '../assets/mara.png';
import snow_icon from '../assets/snow.png';

const Weather = ({ setCity }) => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": slunicko_icon,
    "01n": slunicko_icon,
    "02d": adam,
    "02n": adam,
    "03d": adam,
    "03n": adam,
    "04d": mara,
    "04n": mara,
    "09d": mara,
    "09n": mara,
    "10d": mara,
    "10n": mara,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Umíš ty vůbec psát?");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || slunicko_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setCity(data.name); 
    } catch (error) {
      console.error("Chyba", error);
    }
  };

  useEffect(() => {
    search("Zlín");
  }, []);

  return (
    <div className='weather'>
      <div className="nadpis">
        <h1>Baltčasí Počasí</h1>
      </div>

      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Město/Stát' />
        <img className='search' src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature} °C</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Vlhkost</span>
              </div>
            </div>

            <div className="col">
              <img src={vitr} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Rychlost Adriana</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
