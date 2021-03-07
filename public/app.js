/*****************************************
 * Main file for the workbench functionlities
*****************************************/


// Get Firebase resources after the content of the document has loaded

document.addEventListener("DOMContentLoade", event => {
    const app = firebase.app();
})

/*
    @Description: Function for Authentication with Popup
*/

function loginWithPopup(){

    firebase.auth().useDeviceLanguage();

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    })
    
}

/*
    @Description: Function for Authentication with Redirect
*/

function loginWithRedirect(){

    firebase.auth().useDeviceLanguage();

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    })
    
}


// Adding event listner for the login with redirect button

const loginButtonRedirect = document.querySelector(".login-button--redirect");

loginButtonRedirect.addEventListener("click", event => {
    loginWithRedirect();
})

// Addong event listner for the login with popup button

const loginButtonPopup = document.querySelector(".login-button--popup");

loginButtonPopup.addEventListener("click", event => {
    loginWithPopup();
})
