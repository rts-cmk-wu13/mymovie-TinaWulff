
document.addEventListener("DOMContentLoaded", function () {
    let savedMovies = readFromLocalStorage("favorites") || [];


let root = document.createElement("div");
root.id ="root";
document.querySelector("body").append(root); 

let main = document.createElement("main");
root.append(main);

let savedSection = document.createElement("section");
savedSection.innerHTML =`<h2>Saved Movies</h2>`;
main.append(savedSection);

if (savedMovies.length === 0) {
    savedSection.innerHTML += `<p>No saved movies yet.</p>`;
    return;
}

savedMovies.forEach(movie => {
    console.log(movie);
    let savedArticle = document.createElement("article");
    savedArticle.classList.add("popular__card");

    savedArticle.innerHTML = `
        <h3>${movie.title}</h3>
        <img src="${movie.image}" alt="${movie.title}">
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