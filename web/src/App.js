import React,{ useState } from 'react';

function App() {
	const [ weathers, setWeathers ] = useState([]);

	const [ searchWeather, setSearchWeather ] = useState('');

	async function loadWeather() {
		const search = searchWeather.split(' ');

		const response = await fetch(`http://api.weatherstack.com/current?access_key=e6594003754a7d5ad871e3282c3ca7ba&query=${search.join('%20')}`)
		const data = await response.json()
		setWeathers(data.request)

	}

	return (
		<div className="weather-container">
			<input 
				value={searchWeather}
				onChange={e => setSearchWeather(e.target.value)}
				type="text" 
				placeholder='Search Prevision for your state'
			/>

			<ul>
				<h1>{weathers.query}</h1>
			</ul>
			<button type="submit" onClick={loadWeather}>Buscar previsão</button>
		</div>
	);
}

export default App;
