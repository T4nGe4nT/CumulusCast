document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zipCode').value;
    getWeatherData(zipCode);
});

async function getWeatherData(zipCode) {
    const apiKey = 'f4cd6228fc7ca0ac8d73030f2cd34748';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    const date = new Date().toLocaleDateString();
    const city = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const tempHi = data.main.temp_max;
    const tempLo = data.main.temp_min;
    const weatherIcon = getWeatherIcon(data.weather[0].icon);

    weatherDataDiv.innerHTML = `
        <i class="bi ${weatherIcon} weather-icon"></i>
        <div class="weather-heading"><strong class="kanit-bold">Weather for ${city}</strong></div>
        <p class="hind"><strong>Date:</strong> ${date}</p>
        <p class="hind"><strong>Current Temperature:</strong> ${temperature} °F</p>
        <p class="hind"><strong>Conditions:</strong> ${conditions}</p>
        <p class="hind"><strong>High:</strong> ${tempHi} °F</p>
        <p class="hind"><strong>Low:</strong> ${tempLo} °F</p>
    `;
    weatherDataDiv.style.display = 'block';
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'bi-sun',
        '01n': 'bi-moon',
        '02d': 'bi-cloud-sun',
        '02n': 'bi-cloud-moon',
        '03d': 'bi-cloud',
        '03n': 'bi-cloud',
        '04d': 'bi-clouds',
        '04n': 'bi-clouds',
        '09d': 'bi-cloud-drizzle',
        '09n': 'bi-cloud-drizzle',
        '10d': 'bi-cloud-rain',
        '10n': 'bi-cloud-rain',
        '11d': 'bi-cloud-lightning',
        '11n': 'bi-cloud-lightning',
        '13d': 'bi-cloud-snow',
        '13n': 'bi-cloud-snow',
        '50d': 'bi-cloud-fog',
        '50n': 'bi-cloud-fog'
    };
    return iconMap[iconCode] || 'bi-cloud';
}
