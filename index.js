const firebaseConfig = {
      apiKey: "AIzaSyAlB8il-zyCz9DBdOwAiIDiu1Cd0f4rdnQ",
      authDomain: "ems-demo-11.firebaseapp.com",
      projectId: "ems-demo-11",
      storageBucket: "ems-demo-11.appspot.com",
      messagingSenderId: "245633003470",
      appId: "1:245633003470:web:6db5c5675a48da58c9c59f",
    };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const database = firebase.database();

function register() {
    fullName = document.getElementById("name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("pswrd").value;
    confirmPassword = document.getElementById("cnfrmPswrd").value;

    if(validateName(fullName) == false){
        alert("Name is empty")
        return
    }
    else if(validateEmail(email) == false || validatePassword(password) == false){
        alert("Email or Password is wrong")
        return
    }

    auth.createUserWithEmailAndPassword(email, confirmPassword)
    .then(function () {
        var currentUser = auth.currentUser
        var dbRef = database.ref();
        var userData = {
            name : fullName,
            email : email
        }

        dbRef.child('Users/' + currentUser.uid).set(userData);

        alert('User has been created successfully!!')
    }).catch(function(error){
        var errorMsg = error.message;
        alert(errorMsg);
    })
}

function login() {
    email = document.getElementById("email").value;
    password = document.getElementById("pswrd").value;

    if(validateEmail(email) == false || validatePassword(password) == false){
        alert("Email or Password is wrong")
        return
    }   

    auth.signInWithEmailAndPassword(email, password)
    .then(function () {
        alert('User is logged in successfully!!')
    }).catch(function(error){
        var errorMsg = error.message;
        alert(errorMsg);
    })
}

function validateEmail(email) {
    let expression = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    if(expression.test(email) == true) {
        return true;
    }
    else return false;
}

function validatePassword(password) {
    if(password < 6) {
        return false;
    }
    else return true;
}

function validateName(fullName) {
    if(fullName < 3) {
        return false;
    }
    else return true;
}