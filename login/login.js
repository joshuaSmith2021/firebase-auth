function showError (errorMessage) {
  'use strict';
  document.getElementById('errorText').innerHTML = errorMessage;
  document.getElementById('loginErrorField').style.display = 'block';
}

function loginSuccess () {
  'use strict';
  // Handle successful login
}

function handleLogin (button) {
  'use strict';
  // not sure if I should use var or
  // const on these next two variables :/
  var loginMethod = button.id;
  var userSignedIn = firebase.auth().currentUser;
  if (userSignedIn) {
    showError('You are already logged in! Would you like to <span id="logoutError" style="text-decoration:underline;cursor:pointer;">log out</span>?');
    document.getElementById('logoutError').addEventListener('click', function () {
      firebase.auth().signOut();
      window.location.replace('../?greeting=You%20have&20logged%20out&20successfully.');
    });
  } else {
    if (loginMethod === 'chooseEmail') {
      document.getElementById('getEmailInfo').style.display = 'block';
      document.getElementById('getMethod').style.display = 'none';
      document.getElementById('submitEmailInfo').addEventListener('click', function () {
        let email = document.getElementById('userEmail').value;
        let password = document.getElementById('userPassword').value;
        let noError = true;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          noError = false;
          showError(errorMessage);
        });
        if (noError) {
          loginSuccess();
        }
      });
    } else if (loginMethod === 'chooseGoogle') {
      button.src = 'https://joshuasmith2021.github.io/footy/google-branding/light-pressed.png';
      let provider = new firebase.auth.GoogleAuthProvider();
      let noError = true;
      firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + '\n' + errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      noError = false;
      showError(errorMessage);
    });
    console.log('User successfully signed in.\n' + firebase.auth().currentUser);
    if (noError) {
      loginSuccess();
    }
    button.src = 'https://joshuasmith2021.github.io/footy/google-branding/light.png';
    }
  }
}

(function () {
  'use strict';
  let loginTriggers = document.getElementsByClassName('login-method');
  for (let i = 0; i < loginTriggers.length; i++) {
    loginTriggers[i].addEventListener('click', function () {
      handleLogin(this);
    });
  }
})();
