document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const country = document.getElementById('country');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');

    // Replace with your OpenWeatherMap API key
    const apiKey = 'cf7ed6c5dc2a87f6de113cfd5611ab3e';

    // Initialize
    hideLoading();
    hideError();

    // Add event listener to the button
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        
        if (city === '') {
            showError('Please enter a city name');
            return;
        }
        
        getWeather(city);
    });

    // Add event listener for Enter key
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            
            if (city === '') {
                showError('Please enter a city name');
                return;
            }
            
            getWeather(city);
        }
    });

    // Function to get weather data
    function getWeather(city) {
        // Show loading and hide previous results
        showLoading();
        hideError();
        hideWeatherResult();
        
        // API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        // Fetch data
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                showError(error.message);
            });
    }

    // Function to display weather data
    function displayWeather(data) {
        cityName.textContent = data.name;
        country.textContent = data.sys.country;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
        
        // Show weather result
        showWeatherResult();
    }

    // Helper functions
    function showLoading() {
        loading.style.display = 'flex';
    }

    function hideLoading() {
        loading.style.display = 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showWeatherResult() {
        weatherResult.style.display = 'block';
    }

    function hideWeatherResult() {
        weatherResult.style.display = 'none';
    }
});