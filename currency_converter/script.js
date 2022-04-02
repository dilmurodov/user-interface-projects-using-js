const option1 = document.querySelector(".currency__code--1");
const option2 = document.querySelector(".currency__code--2");
const input1 = document.querySelector("#set__money");
const input2 = document.querySelector("#get__money");
const labelName1 = document.querySelector('.country__name--1')
const labelName2 = document.querySelector('.country__name--2')

let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Origin", "http://localhost:3000");

class Converter {
  #fromCurr = "USD";
  #toCurr = "UZS";
  constructor() {
    option1.addEventListener("change", this.fromCurr.bind(this));
    option2.addEventListener("change", this.toCurr.bind(this));
  }

  fromCurr(curr) {
    this.#fromCurr = curr.target.value;
    
    this._getRequest();
    this._getNameCountry();
  }

  toCurr(curr) {
    this.#toCurr = curr.target.value;
    this._getNameCountry();
    this._getRequest();
  }

  _getRequest() {
    fetch(
      `https://api.exchangerate.host/convert?from=${this.#fromCurr}&to=${
        this.#toCurr
      }`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((dataJson) => {
        return dataJson.result;
      })
      .then((result) => {
        input2.value = (+input1.value * result).toFixed(4);
        input1.addEventListener("input", (e) => {
            let num = new Intl.NumberFormat('uz-UZ').format((+e.target.value * result).toFixed(4));
          input2.value = num;
        });
      });
  }
  _getNameCountry(){
      fetch(
          `https://restcountries.com/v2/currency/${this.#fromCurr.toLocaleLowerCase()}`
      ).then((response) => {
          return response.json();
        }).then((data) => {
        //   console.log(data[0]);
          labelName1.textContent = data[0].name + ` (${data[0].currencies[0].symbol})`
      }).then(() => {
        return fetch(`https://restcountries.com/v2/currency/${this.#toCurr.toLocaleLowerCase()}`)
      }).then((response) => {
          return response.json();
      }).then((data) => {
        // console.log(data[0]);
        labelName2.textContent = data[0].name + ` (${data[0].currencies[0].symbol})`
    })
  }
}

let converter = new Converter();
converter._getNameCountry();
converter._getRequest();