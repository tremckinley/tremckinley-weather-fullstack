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
        forecastBox.style.width = "10em"
        forecastBox.setAttribute("class", "card m-4 shadow")
        forecastBox.setAttribute("id", `day ${i + 1}`);
        fiveDayIconEl = document.createElement("img")
        fiveDayIconEl.setAttribute("class", "reading card-img-top")
        fiveDayIconEl.src = `https://openweathermap.org/img/wn/${fiveDaysAtNoon[i].weather[0].icon}@2x.png`
        cardList = document.createElement("ul");
        cardList.setAttribute("class", "list-group list-group-flush")
        fiveDayTempEl = document.createElement("li")
        fiveDayTempEl.setAttribute("class", "list-group-item")
        fiveDayTempEl.innerHTML = `<i class="bi bi-thermometer-half me-2"></i> ${fiveDaysAtNoon[i].main.temp}`;
        fiveDayWindEl = document.createElement("li")
        fiveDayWindEl.setAttribute("class", "list-group-item")
        fiveDayWindEl.innerHTML =  `<i class="bi bi-wind me-2"></i> ${fiveDaysAtNoon[i].wind.speed}`
        fiveDayHumidityEl = document.createElement("li")
        fiveDayHumidityEl.setAttribute("class", "list-group-item")
        fiveDayHumidityEl.innerHTML = `<i class="bi bi-moisture me-2"></i> ${fiveDaysAtNoon[i].main.humidity}`;

        
        fiveDayContainer.appendChild(forecastBox);
        forecastBox.appendChild(cardList);
        cardList.appendChild(fiveDayIconEl);
        cardList.appendChild(fiveDayTempEl);
        cardList.appendChild(fiveDayWindEl);
        cardList.appendChild(fiveDayHumidityEl);
    }

}

submitButton.addEventListener('click',  populateWeather(cityInput.value))

//getCityLatLong("Memphis  ");

//getWeather("Los Angeles");