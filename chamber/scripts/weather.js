const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const forecastContainer = document.querySelector("#forecast");

weatherIcon.onerror = () => {
    weatherIcon.src = "images/weather/cloudy.svg";
    weatherIcon.alt = "Weather icon";
};

const apiKey = "115a1fd8f3ee555fe93665bdd67d5d81";
const lat = 31.7619;
const lon = -106.4850;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentWeatherUrl);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error(error);
        currentTemp.textContent = "Weather unavailable";
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
        forecastContainer.textContent = "Forecast unavailable";
    }
}

function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    currentTemp.innerHTML = `${temperature}&deg;F`;
    weatherDescription.textContent = description;
    weatherIcon.src = `images/weather/${icon}.svg`;
    weatherIcon.alt = description;
    captionDesc.textContent = "";
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const dailyForecasts = data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
    ).slice(0, 3);

    dailyForecasts.forEach((forecast) => {
        const forecastDay = document.createElement("p");
        const date = new Date(forecast.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(forecast.main.temp);

        forecastDay.classList.add("forecast-day");
        forecastDay.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;F`;

        forecastContainer.appendChild(forecastDay);
    });
}

getWeather();
getForecast();