/*****************************************
 * Main file for the workbench functionlities
*****************************************/


// Get Firebase resources after the content of the document has loaded

document.addEventListener("DOMContentLoade", event => {
    const app = firebase.app();

    // const dbFireStore = firebase.firestore();

    // const authors = dbFireStore.collection('Authors');

    // authors.get()
    // .then(results => { 
    //     console.log(results);
    // })
    // .catch(error => { 
    //     console.error(error);
    // })

    // dbFireStore.collection("Authors").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // });

    // const author = dbFireStore.collection('Authors').doc('Bla');
    // author.get()
    // .then(results => {
    //     console.log(results.data());
    // })
    // .catch(error => {
    //     console.error(error);
    // })
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


/*
    @Description: Function for Requesting Data
*/

async function requestData(){
    const snapshot = await firebase.firestore().collection('Authors').get()
    console.log(snapshot.docs.map(doc => doc.data()));
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

// Addong event listner for the request data button

const requestDataButton = document.querySelector(".request-button");

loginButtonPopup.addEventListener("click", event => {
    requestData();
})

