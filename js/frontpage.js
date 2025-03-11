
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



// // TIL OBSERVER / INFINITY SCROLL
// let currentPageMovies = 1;
// let currentPagePopular = 1;
// let isFetchingMovies = false;
// let isFetchingPopular = false;


// MOVIES NOW SHOWING SECTION

// TIL OBSERVER / INFINITY SCROLL
let currentPageMovies = 1;
let isFetchingMovies = false;
let lastElement;


let main = document.createElement("main");
root.append(main);

let sectionNowShowing = document.createElement("section");
sectionNowShowing.classList.add("nowShowing")
main.append(sectionNowShowing);

let headlineNow = document.createElement("h2");

headlineNow.innerHTML = "Now Showing";
headlineNow.classList.add("nowShowing__headline")
sectionNowShowing.append(headlineNow);


let flexContainer = document.createElement("div");
flexContainer.classList.add("flex-container");
sectionNowShowing.append(flexContainer);


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Eksempel: hvis URL'en er "movie.html?id=12345"

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Fetching more movies...");
            observer.unobserve(entry.target);
            fetchMovie(); 
        }
    });
}, { root: flexContainer, rootMargin: "100px", threshold: 0.1 }); //lav kommentar til dette

function fetchMovie() {
    if (isFetchingMovies) return; // Undgå dobbelt kald
    isFetchingMovies = true;

    let today = new Date().toISOString().split("T")[0]; // Henter dagens dato i YYYY-MM-DD format
    let lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1); // En måned tilbage
    let lastMonthStr = lastMonth.toISOString().split("T")[0]; 

    // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPageMovies}&sort_by=primary_release_date.desc&with_release_type=2|3&primary_release_date.gte=${lastMonthStr}&primary_release_date.lte=${today}`,
    
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPageMovies}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${lastMonthStr}&release_date.lte=${today}`, {
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

        flexContainer.innerHTML += data.results.map((movie) => {
            return`

            <a class="now-showing__linkCard" href="detail-movie.html?id=${movie.id}">
            <article class="now-showing__card">
                <img loading="lazy" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p><i class="fa-solid fa-star"></i>${movie.vote_average}/10 IMDb</p>
            </article>
            </a>
            `
        }).join("");

        let lastMovie = flexContainer.lastElementChild;
        if (lastMovie) {
            observer.observe(lastMovie);
        }

        currentPageMovies++;
        isFetchingMovies = false;
    });
}
// SHOWING NOW SLUT


// TIL OBSERVER / INFINITY SCROLL
let currentPagePopMovies = 1;
let isFetchingPopMovies = false;
let PoplastElement;

// POPULAR SECTION BEGYND
let sectionPopular = document.createElement("section");
sectionPopular.classList.add("sectionPopular");
main.append(sectionPopular);

let headlinePopular = document.createElement("h2");
headlinePopular.classList.add("sectionPopular__headline");
headlinePopular.innerHTML = "Popular"
sectionPopular.append(headlinePopular);

//loader før observer
let loaderPopular = document.createElement("div");
loaderPopular.classList.add("loader");
sectionPopular.append(loaderPopular);


const observerPop = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Fetching more popular movies...");
            observerPop.unobserve(entry.target);
            fetchPopular(); 
        }
    });
}, { root: null, rootMargin: "200px", threshold: 0.1 }); //lav kommentar til dette



function fetchPopular() { 
    if (isFetchingPopMovies) return; // Undgå dobbelt kald
    isFetchingPopMovies = true;

    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPagePopMovies}&sort_by=popularity.desc`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDYyY2I2YzRlYmRhMGY1MDA2ZDYyNDY4N2IxMjhkYiIsIm5iZiI6MTc0MDk4Njc3Ny4xNjEsInN1YiI6IjY3YzU1OTk5ODgxYzAxM2VkZTdhNmZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OZhglLj6yu_2o1SQDcbLtUloW0Z0qhIE7r1-ZmZeN8'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("movie findes ikke!!!!");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Populære film:", data.results);

    
// Fetch detaljer for hver film
        let movieDetailsFetches = data.results.map(movie => {
            return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=genres,runtime`, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDYyY2I2YzRlYmRhMGY1MDA2ZDYyNDY4N2IxMjhkYiIsIm5iZiI6MTc0MDk4Njc3Ny4xNjEsInN1YiI6IjY3YzU1OTk5ODgxYzAxM2VkZTdhNmZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OZhglLj6yu_2o1SQDcbLtUloW0Z0qhIE7r1-ZmZeN8'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fejl ved hentning af film detaljer!");
                }
                return response.json();
            });
        });

        // Når alle fetches er færdige, kombinér dataene // venter på alle fetch-kald.
        return Promise.all(movieDetailsFetches).then((moviesDetails) => {
            let combinedMovies = data.results.map((movie, index) => ({
                ...movie, //Dette er spread-syntax (...), som kopierer alle egenskaber fra movie og tilføjer til det nye objekt.
                genres: moviesDetails[index].genres, // Tilføjer genres
                runtime: moviesDetails[index].runtime // Tilføjer runtime
            }));

            return combinedMovies;
        });
    })
    .then((movieWithDetails) => {
        console.log("Film med ekstra detaljer: ", movieWithDetails);

        sectionPopular.innerHTML += movieWithDetails.map((movie) => {
            return `
                <a class="popular__linkCard" href="detail-movie.html?id=${movie.id}">
                <article class="popular__card">
                    <img loading="lazy" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="details-container">
                    <h3>${movie.title}</h3>
                    <p><i class="fa-solid fa-star"></i>${movie.vote_average}/10 IMDb</p>
                    <div class="genre-container">
                        ${movie.genres.map(genre => `<p class="genre">${genre.name}</p>`).join("")}
                    </div>
                    <p class="time"><i class="fa-regular fa-clock"></i> ${movie.runtime} min</p>
                    </div>
                </article>
                </a>    
            `;
        }).join("");
    

    let lastPopMovie = sectionPopular.lastElementChild;
    if (lastPopMovie) {
        observerPop.observe(lastPopMovie);
    }

    currentPagePopMovies++;
    isFetchingPopMovies = false;
});
}

fetchMovie();
fetchPopular();

// footer
let footer = document.createElement("footer");
root.append(footer);

let movieIcon = document.createElement("i");
movieIcon.classList.add("fa-solid", "fa-tape");

let ticketIcon = document.createElement("i");
ticketIcon.classList.add("fa-solid", "fa-ticket-simple");

let bookmarkIcon = document.createElement("i");
bookmarkIcon.classList.add("fa-regular", "fa-bookmark");


footer.appendChild(movieIcon);
footer.appendChild(ticketIcon);
footer.appendChild(bookmarkIcon);
