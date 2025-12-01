//Weather App open API project
const currentEl = document.getElementById('current-container')
const APIKey = "76adfc47f2fe188af09c3379c519daee"
const cityInput = document.getElementById('city-input')
const submitButton = document.getElementById('city-button')
const fiveDayContainer = document.getElementById('5-day-container')

async function getTestData() {
    const testData = await fetch("./test-data.json");
    return testData;
}

async function getCityLatLong(city) {
    const cityInput = city.trim().toLowerCase()
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIKey}`)
    const data = await response.json()
    console.log(data)
    return data
    
}

async function getWeather(city) {
    const cityInfo = await getCityLatLong(city);
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&appid=${APIKey}&units=imperial`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    return weatherData;
}

async function populateWeather(city) {
    const weatherData = await getWeather(city);
    const currentWeather = weatherData.list[0].main
    const weatherIcon = weatherData.list[0].weather[0].icon;
    const weatherIconEl = document.getElementById('current-card-img');
    const currentTempEl = document.getElementById('current-temp');
    const currentWindEl = document.getElementById('current-wind');
    const currentHumidityEl = document.getElementById('current-humidity');
    //Filter for forecasts at Noon
    const fiveDaysAtNoon = weatherData.list.filter((day) => (day.dt_txt).includes("12:00:00"));
    // If searching in the morning, will remove today's noon forecast.
    if (fiveDaysAtNoon.length > 5) {
        fiveDaysAtNoon.shift();
    };

    weatherIconEl.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    currentTempEl.textContent = currentWeather.temp;
    currentHumidityEl.textContent = currentWeather.humidity;
    currentWindEl.textContent = weatherData.list[0].wind.speed;

    for (let i = 0; i < fiveDaysAtNoon.length; i++) {
        forecastBox = document.createElement("div");
        forecastBox.setAttribute("class", "forecast-box")
        forecastBox.setAttribute("id", `day ${i + 1}`);
        fiveDayIconEl = document.createElement("img")
        fiveDayIconEl.setAttribute("class", "five-day-icon")
        fiveDayIconEl.src = `https://openweathermap.org/img/wn/${fiveDaysAtNoon[i].weather[0].icon}@2x.png`
        fiveDayTempEl = document.createElement("p")
        fiveDayTempEl.setAttribute("class", "five-day-temp")
        fiveDayTempEl.textContent = fiveDaysAtNoon[i].main.temp;
        fiveDayWindEl = document.createElement("p")
        fiveDayWindEl.setAttribute("class", "five-day-wind")
        fiveDayWindEl.textContent = fiveDaysAtNoon[i].wind.speed;
        fiveDayHumidityEl = document.createElement("p")
        fiveDayHumidityEl.setAttribute("class", "five-day-humidity")
        fiveDayHumidityEl.textContent = fiveDaysAtNoon[i].main.humidity;

        
        fiveDayContainer.appendChild(forecastBox);
        forecastBox.appendChild(fiveDayIconEl);
        forecastBox.appendChild(fiveDayTempEl);
        forecastBox.appendChild(fiveDayWindEl);
        forecastBox.appendChild(fiveDayHumidityEl);
    }

}

submitButton.addEventListener('click',  populateWeather(cityInput.value))

//getCityLatLong("Memphis  ");

//getWeather("Los Angeles");