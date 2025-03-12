document.addEventListener("DOMContentLoaded", function() {

    let rootElm = document.documentElement; //tager html'tagget i head i HTML'en
let switchElm = document.querySelector("#switch");
let isDarkMode = readFromLocalStorage("isDarkMode");
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log("matchMedia", browserDark);
console.log("localstorage", isDarkMode);

let darkState = null

if (isDarkMode == null) {
    darkState = browserDark;
} else {
    darkState = isDarkMode;
}


if(darkState) {
    console.log("Er du darkmode?")
    switchElm.checked = true;
    rootElm.setAttribute("data-dark", switchElm.checked)
} else {

    console.log("Er du lightmode?")
    switchElm.checked = false
    rootElm.setAttribute("data-dark", switchElm.checked)
}


switchElm.addEventListener("change", function(){
console.log(switchElm.checked)

saveToLocalStorage("isDarkMode", switchElm.checked)

if(switchElm.checked) {
    rootElm.setAttribute("data-dark", switchElm.checked)
} else {
    rootElm.setAttribute("data-dark", switchElm.checked)
}

})

})
// Se sidste 5 minutter på video for sidste rettelser