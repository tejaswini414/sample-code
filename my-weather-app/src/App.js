// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // We'll add some styles later

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Delhi'); // Default city
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=<span class="math-inline">\{city\}&appid\=</span>{apiKey}&units=metric`;

  const fetchWeatherData = async () => {
	if (!city) {
  	setError("Please enter a city name.");
  	setWeatherData(null);
  	return;
	}
	setLoading(true);
	setError(null);
	setWeatherData(null); // Clear previous data

	try {
  	const response = await fetch(apiUrl.replace(city, encodeURIComponent(city))); // Ensure city name is URL encoded
  	if (!response.ok) {
    	const errorData = await response.json();
    	throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  	}
  	const data = await response.json();
  	setWeatherData(data);
	} catch (e) {
  	setError(e.message);
	} finally {
  	setLoading(false);
	}
  };

  // Handle form submission
  const handleSubmit = (event) => {
	event.preventDefault(); // Prevent page reload
	fetchWeatherData();
  };

  // Fetch weather data on initial load for the default city
  useEffect(() => {
	fetchWeatherData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount


  return (
	<div className="App">
  	<header className="App-header">
    	<h1>React Weather App</h1>
    	<form onSubmit={handleSubmit} className="search-form">
      	<input
        	type="text"
        	value={city}
        	onChange={(e) => setCity(e.target.value)}
        	placeholder="Enter city name"
      	/>
      	<button type="submit">Get Weather</button>
    	</form>

    	{loading && <p className="loading-message">Loading weather data...</p>}
    	{error && <p className="error-message">Error: {error}</p>}

    	{weatherData && !loading && !error && (
      	<div className="weather-info">
        	<h2>{weatherData.name}, {weatherData.sys.country}</h2>
        	<div className="weather-main">
          	<img
            	src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            	alt={weatherData.weather[0].description}
          	/>
          	<p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
        	</div>
        	<p>Condition: {weatherData.weather[0].description}</p>
        	<p>Humidity: {weatherData.main.humidity}%</p>
        	<p>Wind Speed: {weatherData.wind.speed} m/s</p>
        	<p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
      	</div>
    	)}
  	</header>
	</div>
  );
}

export default App;

