import React,{ useState } from 'react';
import worldImg from './assets/world.svg';

import './global.css';
import './App.css';
import './media_query.css';


function App() {
	const [ weathers, setWeathers ] = useState([]);
	const [ searchWeather, setSearchWeather ] = useState('');

	const [ viewWeather, setViewWeather ] = useState('');

	async function loadWeather(e) {
		e.preventDefault();
		setViewWeather('view_box');
		const search = searchWeather.split(' ');

		const response = await fetch(`http://api.weatherstack.com/current?access_key=e6594003754a7d5ad871e3282c3ca7ba&query=${search.join('%20')}`);
		const data = await response.json();

		setWeathers([data.request, data.location, data.current]);
	
		console.log(weathers);
	}


	// {weathers.map(weather => (
	// 	<li key={weather.weather_code}>
	// 		<small>{weather.type}</small>
	// 		<h1>{weather.query}</h1>
	// 		<p>{weather.name}</p>
	// 	</li>
	// ))}

	return (
		<div className="weather-container">
			<header>
				<h1>Search Weather</h1>
				<img src={worldImg} alt="World"/>
			</header>
			<form onSubmit={loadWeather}>
				{viewWeather && (
					<div className={`view-weather ${viewWeather}`}>
						<p id="close" onClick={() => setViewWeather('')}>X</p>
						<p id="name">Niterói, RJ - Brasil</p>
						<h1>20°C Nublado</h1>
						<div className="group-temperature">
							<p>\/ <span>16°</span> /\ <span>25°</span></p>
							<p>Sensação <span>19°C</span></p>
							<p>Vento <span>18km/h</span></p>
							<p>Humidade <span>89%</span></p>
						</div>
						<hr />
						<div className="day-temperature">
							<span>
								<p>Terça</p>
								<h3>18° 26°</h3>
							</span>
							<span>
								<p>Quarta</p>
								<h3>18° 26°</h3>
							</span>
							<span>
								<p>Quinta</p>
								<h3>18° 26°</h3>
							</span>
							<span>
								<p>Sexta</p>
								<h3>18° 26°</h3>
							</span>
							<span>
								<p>Sabado</p>
								<h3>18° 26°</h3>
							</span>
						</div>
					</div>
				)}
				<div className="search-button">
					<input 
						value={searchWeather}
						onChange={e => setSearchWeather(e.target.value)}
						placeholder="Search here weather"
					/>
					<button type="submit">Search</button>
				</div>

			</form>
		</div>
	);
}

export default App;
