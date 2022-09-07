const searchElement = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setWeatherData(data, place.name);
    });
});

const icon = document.querySelector("icon-container");
const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const humidityElement = document.querySelector("[data-humidity]");
const windElement = document.querySelector("[data-wind]");
icon.set(
  "icon",
  `http://openweathermap.org/img/wn/${data.weather[0].iconId}.png`
);
icon.play();

function setWeatherData(data, place) {
  console.log(data);
  locationElement.textContent = place;
  statusElement.textContent = data.weather[0].description;
  temperatureElement.textContent = (data.main.temp - 273.15) * (9 / 5) + 32;
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = data.wind.speed;
  icon.set(
    "icon",
    `http://openweathermap.org/img/wn/${data.weather[0].iconId}.png`
  );
  icon.play();
}
