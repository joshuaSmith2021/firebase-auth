function regSuccess () {
  'use strict';
  // Handle successful registration
}

function regError (errorText) {
  'use strict';
  document.getElementById('errorText').innerHTML = errorText;
  document.getElementById('signupErrorField').style.display = 'block';
}

function regErrorOff () {
  'use strict';
  document.getElementById('signupErrorField').style.display = 'none';
}

function handleReg (button) {
  'use strict';
  const regMethod = button.id;
  if (regMethod === 'chooseEmail') {
    document.getElementById('getEmailInfo').style.display = 'block';
    button.parentNode.style.display = 'none';
    for (let j = 0; j < document.getElementsByClassName('passwords').length; j++) {
      document.getElementsByClassName('passwords')[j].addEventListener('keyup', function () {
        let password = document.getElementById('userPassword').value;
        let passwordConfirm = document.getElementById('confirmPassword').value;
        if (password !== passwordConfirm) {
          regError('Passwords do not match.');
        } else {
          regErrorOff();
        }
      });
    }
    document.getElementById('submitEmailInfo').addEventListener('click', function () {
      let email = document.getElementById('userEmail').value;
      let password = document.getElementById('userPassword').value;
      let passwordConfirm = document.getElementById('confirmPassword').value;
      // Check fields, if everything is fine the else statement runs and user signs up as normal
      if (password !== passwordConfirm) {
        regError('Passwords do not match, please try again.');
      } else if (password === '' || email === '') {
        regError('Please fill out all fields.');
      } else {
        var noError = true;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          regError(errorMessage);
          noError = false;
        });
        if (noError) {
          regSuccess();
        }
      }
    });
  } else if (regMethod === 'chooseGoogle') {
    button.src = 'https://joshuasmith2021.github.io/footy/google-branding/light-pressed.png';
    let provider = new firebase.auth.GoogleAuthProvider();
    var noError = true;
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
      regError(errorMessage);
      noError = false;
    });
    if (noError) {
      regSuccess();
    }
    button.src = 'https://joshuasmith2021.github.io/footy/google-branding/light.png';
  }
}

(function () {
  'use strict';
  let i = 0;
  for (i = 0; i < document.getElementsByClassName('registration-method').length; i++) {
    document.getElementsByClassName('registration-method')[i].addEventListener('click', function () {
      handleReg(this);
    });
  }
})();
