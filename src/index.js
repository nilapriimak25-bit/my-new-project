// 1. Форматування дати та часу
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let days = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// 2. Виведення отриманих даних на сторінку
function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  // Оновлюємо текст
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6); // переведення м/с в км/год (за бажанням)
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  
  // Динамічна іконка погоди
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// 3. Функція пошуку міста через API
function search(city) {
  let apiKey = "6b10eb468ede78f144d0a2c844o71t30"; // Вставте сюди свій реальний API ключ від OpenWeatherMap
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
  
  axios.get(apiUrl).then(displayWeather);
}

// 4. Обробка події відправки форми
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement.value) {
    search(cityInputElement.value);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Початкове місто при завантаженні сторінки
search("Київ");