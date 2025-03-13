

// Hent film-ID fra URL'en
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Eksempel: hvis URL'en er "movie.html?id=12345"


let root = document.createElement("div");
console.log(root);
root.id = "root";
document.body.append(root);

//HEADER
let header = document.createElement("header");
header.classList.add("hero-header");
root.append(header);

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