const mainNav = document.querySelector(".main-nav");
const bismillahArab = document.querySelector(".bismillah.arab")
const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const surahsContainer = document.querySelector(".surahs .container");
const dailyPrayerContainer = document.querySelector(
  ".daily-prayer-page .container"
);
const icon = document.querySelector('.theme-toggle .far.fa-moon.toggle');
const check = document.querySelector('.theme-toggle .check-toggle');
const timeListContainer = document.querySelector(".time-list");
const versesContainer = document.querySelector(".verses");
const asmaulHusnaContainer = document.querySelector(
  ".asmaul-husna-page .container"
);
const prayerIntentionsContainer = document.querySelector(
  ".prayer-intentions-page .container"
);
const audioEl = document.querySelector(".audio");
const themeToggle = document.querySelector(".check-toggle");
const footer = document.querySelector("footer");
const offlineSection = document.querySelector(".offline");
const sidebarLinks = sidebar.querySelectorAll(".link");
const loader = document.querySelector(".loader");
const checkToggle = document.querySelector(".check-toggle");
const pages = document.querySelectorAll(".page");
// const surahPage = pages[0];
const surahPage = document.querySelector(".surah-page");
const setTheme = (el) => {
  const toggleIcon = el.previousElementSibling;
  if (el.checked) {
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    darkTheme = true;
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    darkTheme = false;
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));

let theme = localStorage.getItem("theme");
console.log(theme);
console.log(icon);
if (theme == 'dark'){
  icon.classList.replace("fa-moon", "fa-sun");
  check.checked = true;
} 

surahsContainer.addEventListener("click", (e) => {
  let parent = e.target.closest(".surah");
  if (parent) {
    let id = +parent.querySelector(".number").textContent;
    surahPage.classList.toggle("active");
    changeNavbar(parent, id);
    getAyath(
      `https://api.alquran.cloud/v1/surah/${id}/uz.sodik`,
      `https://api.quran.sutanlab.id/surah/${id}`
    );
  }
});

(async function getSurahs() {
  let ls = localStorage.getItem("surahs");
  if (!JSON.parse(ls)) {
    
    const s = await fetch("https://api.alquran.cloud/v1/meta");
    const j = await s.json();
    const d = j.data.surahs;
    parseSurahs(d);
    localStorage.setItem("surahs", JSON.stringify(d));
    return;
  }
  parseSurahs(JSON.parse(ls));
})();

function parseSurahs(s) {
  for (let i of s.references) {
    let html = `
  <a href="#${i.englishName}" class="surah flex shadow">
            <p class="number">${i.number}</p>
            <div>
               <h3 class="name">${i.englishName}</h3>
               <p class="desc text-gray">${i.englishNameTranslation} • ${i.numberOfAyahs} ayat</p>
            </div>
         </a>`;
    surahsContainer.insertAdjacentHTML("beforeend", html);
  }
}

function changeNavbar(parent, id) {
  let nameAr = JSON.parse(localStorage.getItem("surahs"));
  let CurrentSurah = nameAr.references[id-1];
  bismillahArab.textContent = `${CurrentSurah.englishName}`
  let nma = CurrentSurah.name;
  mainNav.innerHTML = `
            <li class="menu toggle"><i class="far fa-chevron-left"  onclick="All"></i></li>
            <li class="logo">${nma}</li>
            <li class="theme-toggle">
               <label for="check-toggle" class="far fa-play toggle" data-audio="${id}" onclick="AllAudios(this)"></label>
               <input type="checkbox" class="check-toggle" id="check-toggle">
            </li>
         `;

  addEvent();
}
addEvent();

function showSidebar() {
  surahPage.classList.toggle("active");
  mainNav.innerHTML = `<li class="menu toggle"><i class="far fa-bars"></i></li>
  <li class="logo">Qiroat</li>
  <li class="theme-toggle">
     <label for="check-toggle" class="far fa-moon toggle"></label>
     <input type="checkbox" class="check-toggle" id="check-toggle" onchange="setTheme(this)">
  </li>
`;
  addEvent();
}

function addEvent() {
  versesContainer.innerHTML = "";
  const menu = document.querySelector(".menu");
  menu.addEventListener("click", (e) => {
    console.log("sdsd");
    let parent = e.target.closest(".menu");
    if (parent.querySelector(".fa-chevron-left")) {
      console.log(parent);
      showSidebar();
    }
    return;
  });
}

async function getAyath(url1, url2) {
  loader.classList.toggle("active");
  const data = await Promise.all([getJson(url1), getJson(url2)]);
  let datauz = data[0].data.ayahs;
  // let data2 = data[1].data.ayahs;
  let data2 = data[1].data.verses
  renderAyath(datauz, data2);
}

async function getJson(url) {
  const resp = await fetch(url);
  return await resp.json();
}

function renderAyath(datauz, data3) {
  for (let i = 0; i < data3.length; i++) {
    let ayat = `
            <ul class="verse"><li class="arab">${
              data3[i].text.arab
            }</li><li class="latin">${data3[i].number.inSurah}. ${data3[i].text.transliteration.en}</li><li style="font-style: italic" class="means text-gray">${
              datauz[i].text
            }</li><li class="min far fa-play toggle" onclick="toggleAudio(this)" data-audio="${data3[i].audio.primary}"></li> </ul>
         `;
    versesContainer.insertAdjacentHTML("beforeend", ayat);
    loader.classList.remove("active");
  }
}

function toggleAudio(e){
  document.querySelectorAll(".min").forEach(item => item.classList.replace("fa-stop", "fa-play"));
  let a = e.getAttribute("data-audio");
  // console.log(e);
  e.classList.toggle("play");
  audioEl.src = a;
  e.classList.contains("play") ? audioEl.play() : audioEl.pause();
  audioEl.onended = () => {
    e.classList.replace("fa-stop", "fa-play");
  }
  e.classList.contains("play") ? e.classList.replace("fa-play", "fa-stop") : e.classList.replace("fa-stop", "fa-play") 
}

function toggleAudios(e){
  let a = e.getAttribute("data-audio");
  console.log(e);
  e.classList.toggle("play");
  audioEl.src = a;
  e.classList.contains("play") ? audioEl.play() : audioEl.pause();
  e.classList.contains("play") ? e.classList.replace("fa-play", "fa-stop") : e.classList.replace("fa-stop", "fa-play")
}

async function AllAudios(e){

  let n = e.getAttribute("data-audio");
  // loader

  loader.classList.toggle("active");
  
  // fetch
  
  let resp = await fetch(`https://api.quran.sutanlab.id/surah/${n}`)
  let respJs = await resp.json()
  let respVer = respJs.data.verses;
  let i = 0;

  return (function (){
    document.querySelectorAll(".min").forEach(item => item.classList.replace("fa-stop", "fa-play"));
    if (!e.classList.contains("play")){
      e.classList.toggle("play");
      e.classList.replace("fa-play", "fa-stop");
      audioEl.src = respVer[i].audio.primary;
      audioEl.play();
      // request geted

      loader.classList.remove("active")
      
      // do loader unvisible

      audioEl.onended = (ad) => {
        if (i < respVer.length){
          audioEl.src = respVer[++i].audio.primary;
          audioEl.play();
        } else {
          
          e.classList.toggle("play");
          e.classList.replace("fa-stop", "fa-play");
          audioEl.pause();
      };
      }
    } else{
      loader.classList.remove("active")
      audioEl.pause();
      e.classList.toggle("play");
      console.log("stop");
      e.classList.replace("fa-stop", "fa-play");
    }
  })();
 
}