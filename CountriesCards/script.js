'use strict';

const searchInput = document.querySelector('.search');
const btn = document.querySelector('.btn');
const countriesContainer = document.querySelector('.countries');

class Card {
  #baseUrl = 'https://restcountries.com/v2/name/';
  #typerequest = 'GET';
  constructor(option, url) {
    this.option = option;
    this._btnRequest.call(this);
  }

  static createRequestObject() {
    this.request = new XMLHttpRequest();
  }

  get baseUrl() {
    return this.#baseUrl;
  }

  get typeRequest() {
    return this.#typerequest;
  }

  _btnRequest() {
    btn.addEventListener('click', e => {
      this._searchRequest();
    });
  }

  _searchRequest() {
    //...
    if (searchInput.value === '') return;
    this.endpoint = searchInput.value;
    // console.log(this);
    this._getRequest();
  }

  _getRequest() {
    // console.log(this);
    fetch(this.baseUrl + this.endpoint)
      .then(response => {
        console.log(this);
        return response.json();
      })
      .then(data => {
        if (data.status === 404) {
          countriesContainer.innerHTML = '';
          countriesContainer.insertAdjacentHTML('afterbegin', `<h1>Bundey Davlat nomi topilmadi. Qayta urinib kuring!`)
          return;
        }
        countriesContainer.innerHTML = '';
        this._renderHTML(...data);
      });
  }

  _renderHTML(data){
    let template = `
    <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              new Intl.NumberFormat('uz-UZ').format(data.population)
            )}  people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages ? data.languages[0].name : data.languages
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies ? data.currencies[0].name : data.currencies
            }</p>
          </div>
        </article>
    `;
    
    countriesContainer.insertAdjacentHTML('afterbegin', template);
    countriesContainer.getElementsByClassName.opacity = 1;
  }
}

let card = new Card('GET');
// Card.createRequestObject();
// card._getRequest.call(Card);



///////////////////////////////////////
// const request = new XMLHttpRequest();

// request.open('GET', 'https://restcountries.com/v2/all');
// request.send();

// request.addEventListener('load', function () {
//   let data = JSON.parse(request.responseText);
//   console.log(data);
//   data.forEach(data => {
//     let template = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages ? data.languages[0].name : data.languages
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies ? data.currencies[0].name : data.currencies
//             }</p>
//           </div>
//         </article>
//     `;
//     countriesContainer.insertAdjacentHTML('afterend', template);
//     countriesContainer.getElementsByClassName.opacity = 1;
//   });
// });
