

/*
let movieDetailsFetches = data.results.map(movie => {
return fetch (`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDYyY2I2YzRlYmRhMGY1MDA2ZDYyNDY4N2IxMjhkYiIsIm5iZiI6MTc0MDk4Njc3Ny4xNjEsInN1YiI6IjY3YzU1OTk5ODgxYzAxM2VkZTdhNmZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OZhglLj6yu_2o1SQDcbLtUloW0Z0qhIE7r1-ZmZeN8'
  }
})

.then(response => {

    if(!response.ok) {
        throw new Error("detaljer findes ikke")
    }
    return response.json()
})

})

let root = document.createElement("div");
root.id ="root";
document.querySelector("body").append(root); 


//HEADER 
let header = document.createElement("header");
root.append(header);      //appender header i root/wrapper


let goBackArrow = document.createElement("i");
goBackArrow.classList.add("fa-solid", "fa-arrow-left-long");
header.append(goBackArrow);

//let heroImg = document.createElement("img");
//heroImg.src = `${movie.backdrop_path}`;


// Darkmode knap
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
    header.innerHTML += movieDetailsFetches.map((movie) => {
        return `
                <img loading="lazy" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">
                ${goBackArrow}
                ${switchMode}
        `;
    }).join("");

let main = document.createElement("main");
root.append(main);

let sectionNowShowing = document.createElement("section");
sectionNowShowing.classList.add("nowShowing")
main.append(sectionNowShowing);

*/

// Hent film-ID fra URL'en
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Eksempel: hvis URL'en er "movie.html?id=12345"


let root = document.createElement("div");
root.id = "root";
document.body.append(root);

// Hent kun den specifikke film baseret på ID
fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=release_dates,credits`, {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDYyY2I2YzRlYmRhMGY1MDA2ZDYyNDY4N2IxMjhkYiIsIm5iZiI6MTc0MDk4Njc3Ny4xNjEsInN1YiI6IjY3YzU1OTk5ODgxYzAxM2VkZTdhNmZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OZhglLj6yu_2o1SQDcbLtUloW0Z0qhIE7r1-ZmZeN8`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Film ikke fundet");
        }
        return response.json();
    })


    .then(movie => {
        // Særlige variabler til ekstra data:
        const language = movie.spoken_languages[0]; // Vælg første sprog, hvis flere sprog er tilgængelige
        const languageName = language ? language.english_name : "N/A"; // Hvis der er et sprog, vis navnet, ellers "N/A"

        const rating = movie.release_dates.results
            .find(result => result.iso_3166_1 === 'US') // Find USA i release_dates
            ?.release_dates[0]?.certification || "N/A"; // Hent certificeringen (rating), eller "N/A" hvis ikke fundet

        console.log(rating);
        //

        let header = document.createElement("header");
        root.append(header);

        let goBackArrow = document.createElement("i");
        goBackArrow.classList.add("fa-solid", "fa-arrow-left-long");
        header.append(goBackArrow);

        let heroImg = document.createElement("img");
        heroImg.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`


        // Darkmode knap
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

        heroImg.alt = movie.title;
        header.append(heroImg);

        //MAIN
        let main = document.createElement("main");
        root.append(main);

        //SECTION
        let detailsSection = document.createElement("section");
        detailsSection.classList.add("details__section");
        main.append(detailsSection);

        //SECTION_HEADER
        let sectionHeader = document.createElement("header");
        sectionHeader.classList.add("detail__header");
        detailsSection.append(sectionHeader);

        let title = document.createElement("h1");
        title.textContent = movie.title;
        sectionHeader.append(title);

        let bookmarkIcon = document.createElement("i");
        bookmarkIcon.classList.add("fa-regular", "fa-bookmark");
        sectionHeader.append(bookmarkIcon);

        //SECTON_FACTS
        let factSection = document.createElement("section");
        factSection.classList.add("detail__fact-section");
        detailsSection.append(factSection);

        factSection.innerHTML = `
    <p><i class="fa-solid fa-star"></i>${movie.vote_average}/10 IMDb</p>

    <div class="genre-container">
    ${movie.genres.map(genre => `<p class="genre">${genre.name}</p>`).join("")}
    </div>

    <h3 class="detail__fact-header">Length</h3>
    <p>${movie.runtime}</p>
    <h3 class="detail__fact-header">Language</h3>
    <p>${languageName}</p>
    <h3 class="detail__fact-header">Rating</h3>
    <p>${rating}</p>
    `

        //DESCRPTION SECTION
        let descriptSection = document.createElement("section");
        descriptSection.classList.add("detail__descript-section");
        detailsSection.append(descriptSection);

        let descriptHeadline = document.createElement("h2");
        descriptHeadline.classList.add("descript__headline");
        descriptHeadline.innerHTML = "Description";
        descriptSection.append(descriptHeadline);

        let = descriptParagraph = document.createElement("p");
        descriptParagraph.textContent = movie.overview;
        descriptSection.append(descriptParagraph);

        // CAST_SECTION

        let castSection = document.createElement("section");
        castSection.classList.add("detail__cart-section");
        detailsSection.append(castSection);

        let castHeadline = document.createElement("h2");
        castHeadline.textContent = "Cast"
        castSection.append(castHeadline);

        let castDiv = document.createElement("div");
        castDiv.classList.add("details__cast-section__castDiv");
        castSection.append(castDiv);

        castDiv.innerHTML = `
     ${movie.credits.cast.map(cast => `
     <img src="https://image.tmdb.org/t/p/w300/${cast.profile_path}" alt="${cast.name}">
     <p>${cast.name}</p>`)
                .join("")}
    `
    });

