
// HEADER

let root = document.createElement("div");
root.id ="root";
document.querySelector("body").append(root); 

let header = document.createElement("header");
root.append(header);      //appender header i body


let menu = document.createElement("nav");
let menuIcon = document.createElement("i");
menuIcon.classList.add("fa-solid", "fa-bars-staggered");
header.append(menu);
menu.appendChild(menuIcon);

let pageHeadline = document.createElement("h1");
pageHeadline.innerHTML = "MyMovies";
header.append(pageHeadline);

// DARK-MODE switch
let switchMode = document.createElement("div");
switchMode.classList.add("switch-container");
header.append(switchMode);

let switchLabel = document.createElement("label");
switchLabel.classList.add("switch");
switchMode.append(switchLabel);

let swicthInput = document.createElement("input");
swicthInput.type = "checkbox";
swicthInput.id = "switch";

let sliderRoundCSS = document.createElement("span");
sliderRoundCSS.classList.add("slider", "round");
switchLabel.append(swicthInput, sliderRoundCSS);

// HEADER SLUT

// MOVIES NOW SHOWING SECTION

let main = document.createElement("main");
root.append(main);

let sectionNowShowing = document.createElement("section");
sectionNowShowing.classList.add("nowShowing")
main.append(sectionNowShowing);

let headlineNow = document.createElement("h2");
headlineNow.innerHTML = "Now Showing";

sectionNowShowing.append(headlineNow);

function fetchMovie() { 
fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}'https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDYyY2I2YzRlYmRhMGY1MDA2ZDYyNDY4N2IxMjhkYiIsIm5iZiI6MTc0MDk4Njc3Ny4xNjEsInN1YiI6IjY3YzU1OTk5ODgxYzAxM2VkZTdhNmZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OZhglLj6yu_2o1SQDcbLtUloW0Z0qhIE7r1-ZmZeN8'
    }
})
    .then(response => {
        console.log(response.ok);

        if(!response.ok) {
            throw new Error("movie findes ikke!!!!")
        }
        return response.json()
    })

.then((data) => {
    console.log(data);


sectionNowShowing.innerHTML += data.results.map((movie) => {
    return`

    <a href="detail-movie.html">
    <article>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p><i class="fa-solid fa-star"></i>${movie.vote_average}/10 IMDb</p>
    </article>
    </a>
    `
}).join("");



})



}
fetchMovie();