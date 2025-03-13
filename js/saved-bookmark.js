
let root = document.createElement("div");
root.id ="root";
document.querySelector("body").append(root); 

//HEADER
let header = document.createElement("header");
header.classList.add("bookmark-header");
root.append(header);


let bookmarkHeadline = document.createElement("h2");
bookmarkHeadline.classList = "bookmark-headline";
bookmarkHeadline.textContent = "Saved Movies";
header.append(bookmarkHeadline);

let arrowLink = document.createElement("a");
arrowLink.classList.add("arrow-link");
arrowLink.href = "index.html";
header.append(arrowLink);

let goBackArrow = document.createElement("i");
goBackArrow.classList.add("fa-solid", "fa-arrow-left-long");
arrowLink.append(goBackArrow);

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



document.addEventListener("DOMContentLoaded", function () {
    let savedMovies = readFromLocalStorage("favorites") || [];


let main = document.createElement("main");
root.append(main);

let savedSection = document.createElement("section");
main.append(savedSection);

if (savedMovies.length === 0) {
    savedSection.innerHTML += `<p>No saved movies yet.</p>`;
    return;
}

savedMovies.forEach(movie => {
    console.log(movie);
    let savedArticle = document.createElement("article");
    savedArticle.classList.add("saved__card");

    savedArticle.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <button onclick="removeMovie('${movie.id}')">Remove</button>
    `;

    savedSection.appendChild(savedArticle);
});

});

// Funktion til at fjerne film fra localStorage
function removeMovie(movieId) {
let savedMovies = readFromLocalStorage("favorites") || [];
savedMovies = savedMovies.filter(movie => movie.id !== movieId);
saveToLocalStorage("favorites", savedMovies);
location.reload(); // Genindlæs siden for at opdatere listen
};