/*function saveToLocalStorage(key, value) {

    localStorage.setItem(key, JSON.stringify(value))
    return "data saved with the key" + key
}



console.log(succes);

function readFromLocalStorage(key) {

    return JSON.parse(localStorage.getItem(key));

}

function deleteFromLocalStorage(key) {
    localStorage.removeItem(key)
    return "the Element with" + key + "was deleted"
}

let succes = saveToLocalStorage("favorites", [1, 5, 8]) //Test

let read = readFromLocalStorage("favorites")            //Test

let deleted = deleteFromLocalStorage("favorites")       //Test



*/
// NY
/**
 * 
 * @typedef {string | number | boolean | object | any[] } LocalStorageData -- - value to be saved in local storage
 *
 */

/**
 * save an item to local storage
 * @param {string} key - key to be used in local storage
 * @param {string | number | boolean | object | any[] } value - value to be saved
 * @returns {string}
 */

function saveToLocalStorage(key, value) {

    localStorage.setItem(key, JSON.stringify(value))
    return "data saved with the key" + key
}

//console.log(succes);


/**
 * 
 * @param {string} key - key to be read from local storage 
 * @returns 
 */
function readFromLocalStorage(key) {

    return JSON.parse(localStorage.getItem(key));

}

function deleteFromLocalStorage(key) {
    localStorage.removeItem(key)
    return "the Element with" + key + "was deleted"
}


