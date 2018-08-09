# firebase-auth
This repo contains a basic template for using the Firebase authentication system. To get started, clone the repo with standard git commands. From here, there are some things that you may want to put in order.

1. Add Firebase credentials.
  - The credentials file should look like this:
```js
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);
```
  - Replace the values inside <these things> with the actual API keys, links, etc.
2. Add login and registration handling to `login.js` and `register.js`. They have a `loginSuccess()` function and a `regSuccess()` function, respectively. These functions are fired on successful logins, so they can redirect to the home page, launch a cloud function, etc.
3. (optional) Compress `login.js` and `register.js` and update the login and registration pages to point to the compressed files. I would recommend [jscompress](https://jscompress.com), a free, open source JavaScript compressor that works online with no downloads. 
