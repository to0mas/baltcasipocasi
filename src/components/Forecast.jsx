import React, { useEffect, useState } from 'react';
import './Forecast.css';

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await fetch(url);
        const data = await response.json();

        const daily = data.list.filter((_, i) => i % 8 === 0); 
        setForecastData(daily);
      } catch (error) {
        console.error("Chyba při načítání předpovědi:", error);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  return (
    <div className="forecast">
      <h1><span>Předpověď pro:</span> {city}</h1>
      <div className="forecast-list">
        {forecastData.map((item, index) => (
          <div className="forecast-item" key={index}>
        
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="icon"
            />
            <h3>{Math.floor(item.main.temp)} °C</h3>

            <div className="date">
                <p> - {new Date(item.dt * 1000).toLocaleDateString()}</p>
            </div>
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
