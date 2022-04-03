const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const conditionText = document.querySelector(".text");
const conditionIcon = document.querySelector(".icon");
const temp_c = document.querySelector(".number__c");
const mainContainer = document.querySelector(".main");
const loader = document.querySelector(".loader");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class Weather {
  #location = "Toshkent";
  #key = "7a7af721fe424906ae2221157220204";
  #url = `https://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${this.location}&days=7&aqi=yes&alerts=yes`;

  constructor() {
    searchBtn.addEventListener("click", this._searchRequest.bind(this));
  }
  _getLocation(){
      if(navigator.geolocation){
          fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=90ab8ef8b0a44687a3dce2a6e784804a', 
          {
              method: 'GET',
          }).then((response) => {
              return response.json();
          }).then(jsonData => {
              this.#location = `${jsonData.city}`
             
              this._getRequest()
          })
      } else {
          alert('Geolocation is not supported by this browser.Please update your browser!😢')
      }
  }
  get key() {
    return this.#key;
  }

  get url() {
    console.log(this.#url);
    return this.#url;
  }

  get location() {
    return this.#location;
  }
  set location(locale) {
    this.#location = locale;
  }

  set url(location) {
    this.#url = `https://api.weatherapi.com/v1/forecast.json?key=${
      this.#key
    }&q=${location}&days=7&aqi=yes&alerts=yes`;
  }
  _searchRequest() {
    if (searchInput.value === "") return;
    this.location = searchInput.value;
    this.url = searchInput.value;
    console.log(this.location);
    this._getRequest();
    searchInput.value = "";
  }
  _renderHTML(num_c, image, state, place, date, day, humedity, wind, wind_dir) {
    let html = `<div class="card">
        <div class="card__top">
            <span>${day}</span>
            <span>${date}</span>
        </div>
        <div class="card__body">
            <p class="name__country">${place}</p>
            <div class="current__celsiues">
                <h1><span class="number__c">${num_c}</span><sup>o</sup>C</h1>
                <span>
                    <img class="icon" src="${image}" alt="">
                </span>
            </div>
            <div class="weather__text">
                <h1 class="text">${state}</h1>
            </div>
            <div class="details">
                <span>
                    <img src="./img/icon-umberella.png" alt="">
                    <span class="grey">${humedity}%</span>
                </span>
                <span>
                    <img src="./img/icon-wind.png" alt="">
                    <span class="grey">${wind}km/h</span>
                </span>
                <span>
                    <img src="./img/icon-compass.png" alt="">
                    <span class="grey">${wind_dir}</span>
                </span>
            </div>
        </div>
    </div>`;

    mainContainer.insertAdjacentHTML("beforeend", html);
  }
  _getRequest() {
    let place = null;
    let wind_dir = null;
    fetch(this.url)
      .then((response) => {
        console.log("sdsd");
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        wind_dir = jsonData.current.wind_dir;
        place = jsonData.location.name;
        return jsonData.forecast;
      })
      .then((forecast) => {
        return forecast.forecastday;
      })
      .then((forecasts) => {
        mainContainer.innerHTML = "";
        forecasts.forEach((item) => {
          let text = item.day.condition.text;
          let source = item.day.condition.icon;
          let temp = Math.round(item.day.avgtemp_c);
          let dateObj = new Date(item.date);
          let day = days[dateObj.getDay()];
          let date = `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
          let humedity = item.day.avghumidity;
          let wind = item.day.maxwind_kph;

          this._renderHTML(
            temp,
            source,
            text,
            place,
            date,
            day,
            humedity,
            wind,
            wind_dir
          );
        });
      }).catch((err) => {
          alert(new Error('Bundey joy nomi aniqlanmadi!'))
      })
      .finally((err) => {
          loader.style.opacity = 0;
          mainContainer.style.opacity = 1;
      })
  }
}
let weather = new Weather();
weather._getLocation();