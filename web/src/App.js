import React,{ useState } from 'react';
import worldImg from './assets/world.svg';

import './global.css';
import './App.css';
import './media_query.css';



function App() {
	const [ weathers, setWeathers ] = useState([]);
	const [ searchWeather, setSearchWeather ] = useState('');

	const [ localTime, setLocalTime ] = useState([]);

	const [ viewWeather, setViewWeather ] = useState('');

	async function loadWeather(e) {
		e.preventDefault();
		
		const search = searchWeather.split(' ');
		try {
			const response = await fetch(`http://api.weatherstack.com/current?access_key=e6594003754a7d5ad871e3282c3ca7ba&query=${search.join('%20')}`);
			const data = await response.json();

			setWeathers(data);

			setLocalTime(data.location.localtime.split(' '))

			setViewWeather('view_box');
		} catch ( err ) {
			return alert("Error in search weather")
		}
   		
	}


	function consoleLog() {
		console.log(weathers);
		console.log(localTime[1].slice(0, -3));
	}

	return (
		<div className="weather-container">
			<header>
			<button onClick={consoleLog}>Ver Data Weather</button>
				<h1>Search Weather</h1>
				<img src={worldImg} alt="World"/>
			</header>
			<form onSubmit={loadWeather}>
				{viewWeather && (
					<div className={`view-weather ${viewWeather}`}>
						<p id="close" onClick={() => setViewWeather('')}>x</p>
						<p id="name">{weathers.location.name}, {weathers.location.region} - {weathers.location.country} </p>
						<h1>{weathers.current.temperature}°C {weathers.current.weather_descriptions} <img src={weathers.current.weather_icons} alt="Weather icon"/></h1>
						<div className="group-temperature">
							<p>\/ <span>16°</span> /\ <span>25°</span></p>
							<p>Sensação <span>{weathers.current.feelslike}°C</span></p>
							<p>Vento <span>{weathers.current.wind_speed}km/h</span></p>
							<p>Humidade <span>{weathers.current.humidity}%</span></p>
						</div>
						<hr />
						<div className="day-temperature">
							<span>
								<p>Data:</p>
								<h3>{localTime[0]}</h3>
							</span>
							<span>
								<p>Hora:</p>
								<h3>{localTime[1].slice(0, -3) < 13 ? `${localTime[1]} AM` : `${localTime[1]} PM`}</h3>
							</span>
							<span>
								<p>UV:</p>
								<h3>{weathers.current.uv_index}</h3>
							</span>
							<span>
								<p>Visível:</p>
								<h3>{weathers.current.visibility}</h3>
							</span>
						</div>
					</div>
				)}
				<div className="search-button">
					<input 
						value={searchWeather}
						onChange={e => setSearchWeather(e.target.value)}
						placeholder="Search here weather"
						required
					/>
					<button type="submit">Search</button>
				</div>

			</form>
		</div>
	);
}

export default App;
