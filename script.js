const apiKey = "f15cda68c26c2845d3cff1700930ad0e"; // Replace with your API key
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const weatherInfo = document.getElementById('weather-info');
const body = document.body; // Reference to the body element for background change

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherCondition = data.weather[0].main; // Get the general weather condition
                const weatherIcon = data.weather[0].icon; // Get the weather icon code
                const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`; // Construct icon URL
                const cityName = data.name;
                const country = data.sys.country;

                // Change background based on weather condition
                changeBackground(weatherCondition);

                // Create 2x2 weather parameter layout
                weatherInfo.innerHTML = `
                    <h2>${cityName}, ${country}</h2>
                    <div id="icon-display">
                        <img src="${weatherIconUrl}" alt="Weather Icon">
                        <p>${weatherCondition}</p>
                    </div>
                    <div class="parameter">
                        <img src="https://cdn-icons-png.flaticon.com/256/10766/10766489.png" alt="Temperature Icon">
                        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                    </div>
                    <div class="parameter">
                        <img src="https://cdn-icons-png.flaticon.com/256/8923/8923689.png" alt="Humidity Icon">
                        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    </div>
                    <div class="parameter">
                        <img src="https://cdn-icons-png.flaticon.com/256/5532/5532989.png" alt="Wind Icon">
                        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                    </div>
                    <div class="parameter">
                        <img src="https://cdn-icons-png.flaticon.com/256/2272/2272202.png" alt="Weather Description Icon">
                        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
                    </div>
                `;
            } else {
                weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            console.error(error);
        });
});

// Function to change the background
function changeBackground(condition) {
    switch (condition) {
        case "Clear":
            body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1733259691737-6b9a4f78c6c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        case "Clouds":
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1525776759712-7b066ce45de0?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        case "Rain":
        case "Drizzle":
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1493314894560-5c412a56c17c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        case "Thunderstorm":
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        case "Snow":
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1507181380775-16c084b6c9d1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1542826522-beb53da5f648?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        default:
            body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
}
