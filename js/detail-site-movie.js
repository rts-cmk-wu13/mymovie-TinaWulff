

// Hent film-ID fra URL'en
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Eksempel: hvis URL'en er "movie.html?id=12345"


let root = document.createElement("div");
root.id = "root";
document.body.append(root);

// Hent kun den specifikke film baseret på ID
fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=release_dates,credits,videos`, {
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

        //HEADER
        let header = document.createElement("header");
        header.classList.add("hero-header");
        root.append(header);

        let arrowLink = document.createElement("a");
        arrowLink.classList.add("arrow-link");
        arrowLink.href= "index.html";
        header.append(arrowLink);

        let goBackArrow = document.createElement("i");
        goBackArrow.classList.add("fa-solid", "fa-arrow-left-long");
        arrowLink.append(goBackArrow);

        let heroImg = document.createElement("img");
        heroImg.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        heroImg.alt = movie.title;
        header.append(heroImg);

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

        //SLUT HEADER SLUT

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

        let bookmarkBtn = document.createElement("button");
        bookmarkBtn.classList.add("bookmark-button");
        sectionHeader.append(bookmarkBtn);
        let bookmarkIcon = document.createElement("i");
        bookmarkIcon.classList.add("fa-regular", "fa-bookmark");
        bookmarkBtn.append(bookmarkIcon);

        //SECTON_FACTS
        let factSection = document.createElement("section");
        factSection.classList.add("detail__fact-section");
        detailsSection.append(factSection);

        factSection.innerHTML = `
    <p class="point"><i class="fa-solid fa-star"></i>${movie.vote_average}/10 IMDb</p>

    <div class="genre-container">
    ${movie.genres.map(genre => `<p class="genre">${genre.name}</p>`).join("")}
    </div>

    <h3 class="detail__fact-header">Length</h3>
    <p class="detail__fact-value">${movie.runtime}</p>
    <h3 class="detail__fact-header">Language</h3>
    <p class="detail__fact-value">${languageName}</p>
    <h3 class="detail__fact-header">Rating</h3>
    <p class="detail__fact-value">${rating}</p>
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

// trailer section


const trailer = movie.videos.results.find(video => video.type === "Trailer" && video.site === "YouTube");

if (trailer) {
    const videoKey = trailer.key;
    const trailerUrl = `https://www.youtube.com/embed/${videoKey}`;
    // Skab iframe og append den

let trailerSection = document.createElement("section");
trailerSection.classList.add("trailer-section");

const trailerHeadline = document.createElement("h2");
trailerHeadline.class = "trailer-headline";
trailerHeadline.textContent = "Trailer";
trailerSection.append(trailerHeadline);

const trailerContainer = document.createElement("div");
trailerContainer.classList.add("trailer-container");
trailerSection.append(trailerContainer);

const traileriframe = document.createElement("iframe");
traileriframe.width = "100%";
traileriframe.height = "100%";
traileriframe.src = trailerUrl;
traileriframe.allowFullscreen = true;
traileriframe.frameBorder = "0";
detailsSection.append(trailerSection);
trailerSection.append(trailerContainer);
trailerContainer.append(traileriframe);

} else {
    console.log("Ingen trailer fundet");
}

        // CAST_SECTION

        let castSection = document.createElement("section");
        castSection.classList.add("detail__cast-section");
        detailsSection.append(castSection);

        let castHeadline = document.createElement("h2");
        castHeadline.textContent = "Cast"
        castSection.append(castHeadline);

        let castDiv = document.createElement("div");
        castDiv.classList.add("details__cast-section__castDiv");
        castSection.append(castDiv);

        castDiv.innerHTML = `
     ${movie.credits.cast.map(cast => `
     
     <div class="cast-card">
     <img src="https://image.tmdb.org/t/p/w300/${cast.profile_path}" alt="${cast.name}">
     <p>${cast.name}</p>
     </div>`)
                .join("")}
    `
    });

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


