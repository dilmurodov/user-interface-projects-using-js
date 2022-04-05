const heading = document.querySelector(".heading__box");
const mainRepos = document.querySelector(".main");
const userInput = document.querySelector(".user__input");
const head = document.querySelector(".head");
let findUser = async function (url) {
  try {
    let a = await fetch(url, {method: 'GET'});
    if (!a.ok) {
      throw new Error(`Bundey user tolpilmadi ${a.status} ${a.statusText}`);
    }

    let obj = await a.json();
    let html = `<div class="box user__info">
  <div class="user__img">
    <img class="user-img" src="${obj.avatar_url}" alt="" />
    <a href="${obj.html_url}" class="btn">View Profile</a>
  </div>

  <div class="user__about">
    <div class="statistics">
    ${
      obj.public_repos
        ? `<p class="stat stat__1">Public Repos: ${obj.public_repos}</p>`
        : ""
    }
    ${
      obj.public_gists
        ? `<p class="stat stat__2">Public Gists: ${obj.public_gists}</p>`
        : ""
    }
    ${
      obj.followers
        ? `<p class="stat stat__3">Followers: ${obj.followers}</p>`
        : ""
    }
      ${
        obj.following
          ? `<p class="stat stat__4">Followers: ${obj.following}</p>`
          : ""
      }
    </div>
    <div class="infoo">
      <div class="table__info">
        ${
          obj.company
            ? ` <p class="about__text">Company: ${obj.company}</p>`
            : ""
        }
        ${obj.blog ? `<p class="about__text">Website/Blog:${obj.blog}</p>` : ""}
        ${
          obj.location
            ? `<p class="about__text">Location:${obj.location}</p>`
            : ""
        }
        ${
          obj.created_a
            ? `<p class="about__text yes__border">Member Since:${obj.created_a}</p>`
            : ""
        }
      </div>
    </div>
  </div>
</div>`;
    head.innerHTML = html;
  } catch (err) {
    // ...
  }
};
const addRepo = async function (url) {
  try {
    let a = await fetch(url, {method: 'GET'});
    if (!a.ok) {
      throw new Error(`Bundey user Topilmadi ${a.status} ${a.statusText}`);
    }

    let r = await a.json();
    mainRepos.innerHTML = "";
    for (let repo of r) {
      let h = `<div class="box repo">
  <a href="${repo.html_url}" class="repo__name">${repo.name}</a>
  <div class="report">
    <p class="stat stat__1">Starts: ${repo.stargazers_count}</p>
    <p class="stat stat__2">Watchers: ${repo.watchers_count}</p>
    <p class="stat stat__3">Forks: ${repo.forks}</p>
  </div>
  </div>`;
      mainRepos.insertAdjacentHTML("afterbegin", h);
    }
  } catch (err) {
    // alert(err);
  }
};
userInput.addEventListener("input", function (e) {
  findUser(
    `https://api.github.com/users/${e.target.value}?client_id=dccdd15ae8449f37292b&client_secret=85fed611e5288b9ba65ca568cc30d50839be0ff2`
  );
  addRepo(
    `https://api.github.com/users/${e.target.value}/repos?per_page=created:asc&sort=5&client_id=dccdd15ae8449f37292b&client_secret=85fed611e5288b9ba65ca568cc30d50839be0ff2`
  );
});

// fetch("https://api.github.com/users/dilmurodov/repos?per_page=created:asc&sort=5&client_id=dccdd15ae8449f37292b&client_secret=85fed611e5288b9ba65ca568cc30d50839be0ff2").then(resp => resp.json()).then(console.log)
