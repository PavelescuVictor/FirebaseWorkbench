/*****************************************
 * Main file for the workbench functionlities
*****************************************/

import "./styles.css";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";

// Initializa Firebase App
const firebaseConfig = {
    apiKey: "AIzaSyD4uk8sIlNSznve9Ath-T8I3qYEPq6YBwE",
    authDomain: "fir-workbench-d5b34.firebaseapp.com",
    projectId: "fir-workbench-d5b34",
    storageBucket: "fir-workbench-d5b34.appspot.com",
    messagingSenderId: "1061987155341",
    appId: "1:1061987155341:web:7eb4e1c4416715e6a011c4",
    measurementId: "G-PL20HH5CK8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Import Database
import "firebase/firestore";
const firesStoreDatabase = firebase.firestore();

// Get Firebase resources after the content of the document has loaded
// document.addEventListener("DOMContentLoaded", event => {
//     const app = firebase.app();
// })

// Available Collections
const collections = {
	AUTHORS: "Authors",
}

// Available Alert Types
const alertTypes = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning"
}

// Checking for a change in the auth system
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      displaySignedInButtons();
    } else {
      displaySignedOutButtons();
    }
  });

/**
 * Authentication with Popup
 */
function loginWithPopup(){
    firebase.auth().useDeviceLanguage();

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        console.log(result);
        const message = "Signed In With Popup";
        const alertType = alertTypes.INFO;
        addAlertMessage(message, alertType);
        displaySignedInButtons();
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} /n Error Message: ${errorMessage}`)

        const message = `Error code: ${errorCode} /n Error Message: ${errorMessage}`;
        const alertType = alertTypes.ERROR;
        addAlertMessage(message, alertType);
    })
}

/**
 * Authentication with Redirect
 */
function loginWithRedirect(){
    firebase.auth().useDeviceLanguage();

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
    .then(result => {
        console.log(result);
        const message = "Signed In With Redirect";
        const alertType = alertTypes.INFO;
        addAlertMessage(message, alertType);
        displaySignedInButtons();
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} /n Error Message: ${errorMessage}`)

        const message = `Error code: ${errorCode} /n Error Message: ${errorMessage}`;
        const alertType = alertTypes.ERROR;
        addAlertMessage(message, alertType);
    })
    
}

/**
 *  Authentication Anonymously
 */
function loginAnonymously(){
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInAnonymously()
    .then(() => {
        const message = "Signed In Anonymously";
        const alertType = alertTypes.INFO;
        addAlertMessage(message, alertType);
        displaySignedInButtons();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode} /n Error Message: ${errorMessage}`)

        const message = `Error code: ${errorCode} /n Error Message: ${errorMessage}`;
        const alertType = alertTypes.ERROR;
        addAlertMessage(message, alertType);
    });
    
}

/**
 * Signing Out
 */
function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
          const message = "Signed Out";
          const alertType = alertTypes.INFO
          addAlertMessage(message, alertType);
          displaySignedOutButtons();
      })
      .catch((error) => {
        const message = `Error code: ${errorCode} /n Error Message: ${errorMessage}`;
        const alertType = alertTypes.ERROR;
        addAlertMessage(message, alertType);
      });
  }

// function createElement(object) {
//     console.log(object);
//     for(key in object){
//         const paragraph = document.createElement("p");
//         switch (typeof object[key]){
//             case "string":
//                 break;
//             case "number":
//                 break;
//             case "Array":
//                 break;
//             case "Object":
//                 break;
//             default:
//                 break;
//         }
//     }
// }

/**
 * Request all data from a specific Collection
 */
function requestAllData(collectionId = collections.AUTHORS){
    firesStoreDatabase.collection(collectionId)
    .get()
    .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(JSON.stringify(doc.data()));
            data.push(JSON.stringify(doc.data()))
        });

        const message = "Data Received";
        const alertType = alertTypes.SUCCESS
        addAlertMessage(message, alertType);

        displayData(data);
    })
    .catch((error) => {
        const alertType = alertTypes.ERROR;
        addAlertMessage(error.message, alertType);
    });
}

/**
 * Request data from a specific Collection and a specific Document
 * @param collectionId The id of the collection
 * @param documentId The id of the document
 */
function requestSpecificData(collectionId = collections.AUTHORS, documentId = "KGi8sT2VLjPmYpTqZd2s"){
    console.log(documentId);
    firesStoreDatabase.collection(collectionId)
    .doc(documentId)
    .get()
    .then((doc) => {
        doc.exists ? console.log(JSON.stringify(doc.data())) : console.log("There is no document matching the id!")
        const data = [JSON.stringify(doc.data())]

        const message = "Data Received";
        const alertType = alertTypes.SUCCESS
        addAlertMessage(message, alertType);
        
        displayData(data);
    })
    .catch((error) => {
        const alertType = alertTypes.ERROR;
        addAlertMessage(error.message, alertType);
    });
}


/**
 * Removing an alert from the alertbox
 * @param target The target alert we want to remove
 */
function removeAlertMessage(target){
    target.remove();
}

/**
 * Adding an alert to the alertbox
 * @param alertMessage The message for the new alert
 * @param alertType The type of the new alert
 */
function addAlertMessage(alertMessage, alertType){
    const alertParagraphTextNode = document.createTextNode(alertMessage);
    const alertParagraphElement = document.createElement("p");
    alertParagraphElement.appendChild(alertParagraphTextNode);

    const alertItemElement = document.createElement("div");
    alertItemElement.appendChild(alertParagraphElement);
    alertItemElement.classList.add("alertbox__item");
    const alertTypeClass = `alertbox__item--${alertType}`;
    alertItemElement.classList.add(alertTypeClass);
    alertItemElement.addEventListener("click", event => {
        removeAlertMessage(event.currentTarget)
    });

    const alertbox = document.querySelector("#alertbox");
    alertbox.appendChild(alertItemElement);
    setTimeout(() => {
        //alertbox.removeChild(alertItemElement);
        removeAlertMessage(alertItemElement)
    }, 5000);
}

/**
 * Displaying the buttons when the user is logged in
 */
function displaySignedInButtons() {
    const signoutButton = document.querySelector(".button--signout");
    signoutButton.classList.remove("button--hidden");

    const loginRedirectButton = document.querySelector(".button--redirect");
    loginRedirectButton.classList.add("button--hidden");

    const loginPopupButton = document.querySelector(".button--popup");
    loginPopupButton.classList.add("button--hidden");

    const loginAnonymouslyButton = document.querySelector(".button--anonymously");
    loginAnonymouslyButton.classList.add("button--hidden");
}

/**
 * Displaying the buttons when the user is logged off
 */
function displaySignedOutButtons() {
    const signoutButton = document.querySelector(".button--signout");
    signoutButton.classList.add("button--hidden");

    const loginRedirectButton = document.querySelector(".button--redirect");
    loginRedirectButton.classList.remove("button--hidden");

    const loginPopupButton = document.querySelector(".button--popup");
    loginPopupButton.classList.remove("button--hidden");

    const loginAnonymouslyButton = document.querySelector(".button--anonymously");
    loginAnonymouslyButton.classList.remove("button--hidden");
}

/**
 * Displaying the data from the database on the page
 * @param data The data we are displaying on the page
 */
function displayData(data) {
    const contentDataElement = document.querySelector(".content__data");
    contentDataElement.innerHTML = ""
    data.forEach((element) => {
        const paragraph = document.createElement("p");
        const dataTextNode = document.createTextNode(data)
        paragraph.appendChild(dataTextNode);
        paragraph.classList.add("content__item")
        contentDataElement.appendChild(paragraph);
    })
}

/**
 * Scrolling to the top of the page
 */
function scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Adding event listener for the login with redirect button
const loginRedirectButton = document.querySelector(".button--redirect");
loginRedirectButton.addEventListener("click", loginWithRedirect);

// Adding event listener for the login with popup button
const loginPopupButton= document.querySelector(".button--popup");
loginPopupButton.addEventListener("click", loginWithPopup);

// Adding event listener for the login with popup button
const loginAnonymouslyButton = document.querySelector(".button--anonymously");
loginAnonymouslyButton.addEventListener("click", loginAnonymously);

// Adding event listener for the sign out button
const signoutButton = document.querySelector(".button--signout");
signoutButton.addEventListener("click", signOut);

// Adding event listener for the request all data button
const requestAllDataButton = document.querySelector(".button--request-all");
requestAllDataButton.addEventListener("click", event => {
    requestAllData();
});

// Adding event listener for the request specific data button
const requestSpecificDataButton = document.querySelector(".button--request-specific");
requestSpecificDataButton.addEventListener("click", event => {
    requestSpecificData();
});

// Adding event listener for the scroll top button
const scrollTopButton = document.querySelector(".back-top-button");
scrollTopButton.addEventListener("click", scrollTop);