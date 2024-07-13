import React, { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import './weather.css';
import thunderstorm_icon from '../assets/thunderstorm.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';

const Weather = ({ city = 'mumbai' }) => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('bg-default');

  useEffect(() => {
    search(city);
  }, [city]);

  const fetchWeatherData = async (city) => {
    const apiKey = import.meta.env.VITE_APP_ID;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  const updateBackgroundClass = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        setBackgroundClass('bg-clear');
        break;
      case 'rain':
      case 'drizzle':
        setBackgroundClass('bg-rainy');
        break;
      case 'clouds':
        setBackgroundClass('bg-cloudy');
        break;
      case 'snow':
        setBackgroundClass('bg-snowy');
        break;
      case 'thunderstorm':
        setBackgroundClass('bg-thunderstorm');
        break;
      default:
        setBackgroundClass('bg-default');
    }
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city");
      return;
    }

    try {
      const data = await fetchWeatherData(city);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      updateBackgroundClass(data.weather[0].main);
    } catch (error) {
      console.error("Error in fetching data", error);
      setWeatherData(false);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": cloud_icon,
    "50n": cloud_icon,
  };

  return (
    <div className={`weather-app ${backgroundClass}`}>
      <div className='search-bar'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Enter city name'
          defaultValue={city}
          onKeyDown={handleSearch}
        />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData && (
        <div className='weather-info'>
          <img src={weatherData.icon} alt="Weather icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windspeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
