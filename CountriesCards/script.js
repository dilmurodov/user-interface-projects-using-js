'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest();

request.open('GET', 'https://restcountries.com/v2/all');
request.send();

request.addEventListener('load', function () {
    let data = JSON.parse(request.responseText);
    console.log(data);
    data.forEach(data => {
        let template = `
    <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population/1000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages ? data.languages[0].name : data.languages}</p>
            <p class="country__row"><span>💰</span>${data.currencies ? data.currencies[0].name : data.currencies}</p>
          </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('afterend', template);
    countriesContainer.getElementsByClassName.opacity = 1;
    })  
})
