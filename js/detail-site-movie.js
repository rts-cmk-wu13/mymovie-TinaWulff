


let movieDetailsFetches = data.results.map(movie => {
return fetch (`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDYyY2I2YzRlYmRhMGY1MDA2ZDYyNDY4N2IxMjhkYiIsIm5iZiI6MTc0MDk4Njc3Ny4xNjEsInN1YiI6IjY3YzU1OTk5ODgxYzAxM2VkZTdhNmZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OZhglLj6yu_2o1SQDcbLtUloW0Z0qhIE7r1-ZmZeN8'
  }
})

.then(response => {
    console.log(response.ok);

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