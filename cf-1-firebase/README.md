YouTube tutorial: 
### [Cloud Functions for Firebase - Tutorials](https://www.youtube.com/watch?v=DYfP-UIKxH0&list=PLl-K7zZEsYLkPZHe41m4jfAxUi0JjLgSM&index=1)

Project on Firebase:
### [cloud-functions](https://console.firebase.google.com/u/0/project/cloud-functions-13401/overview)

### lecture 1
- Getting Started with Cloud Functions for Firebase using TypeScript - Firecasts
* Steps to setup project:
* First create a Firebase folder and in terminal navigate in there.
* install or check if you have installed 'node.js' and 'firebase' (like: node --version or 'sudo npm install -g firebase-tools').
* run " firebase login:ci " not just " firebase login " like the instructor says. [Check this link](https://stackoverflow.com/questions/33939143/firebase-tools-login-from-command-line)
* After some work you get a token
✔  Success! Use this token to login on a CI server:

1//03SE-7dmBYOrrCgYIARAAGAMSNwF-L9IrxVOo4uHCUI9siBbaUO-gtyu_WYqGlCS5T2ErHIANQlasUVpdYGtDeJg7un8BgKHty2A

* run " firebase init " if you get an error try again.
* From CLI features choose " Functions: Configure and deploy Cloud Functions ".
* Associate your project with a Firebase project. Then a functions directory will be created in your project which you can deploy with "firebase deploy".
* Then choose "TypeScript" for a language. And type "y" to use TSLint to catch probable bugs and enforce style. Also install dependencies with npm: Yes
* Then "cd functions" and run " npm install firebase-admin@latest firebase-functions@latest "
* cd .. and code .


* package.json is a package created by 'Node.js' to describe this project.
* index.js is the entry point to define all your functions.
* To deploy your functions run 'firebase deploy' if you have troubles try 'firebase deploy --only functions'

* Description content of video:
* Firebase console → https://goo.gl/mgj8Sc
* Install node.js → https://goo.gl/D33cb2
* Cloud Functions documentation → https://goo.gl/BwdRcY
* Codelab → https://goo.gl/DvWbAB
* Sample code → https://goo.gl/jPLjJd
* Using TSLint with TypeScript → https://goo.gl/gg65KD

* Cloud Functions for Firebase - Tutorials → http://bit.ly/2M2ZBcE
* Subscribe to the Firebase channel → http://bit.ly/

* Check also on the video comments the way to run cloud functions on a local host
When I try on localhost I get an empty object { }. But it works fine if I deploy it...

- Learn to Code

That's because you are not logged in and cannot read data from firebase database/cloud.
You need  download the  json key and set it up in environments variables as it is described here: https://firebase.google.com/docs/functions/local-emulator#windows
https://console.cloud.google.com/iam-admin/serviceaccounts


@Learn to Code 

Thanks a lot! It worked!

I went to Google Cloud Platform I searched for 'App Engine default service account ', found the one for this project, selected it, created a key, downloaded in the functions folder, as JSON and then I run 

$ export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"

$ firebase emulators:start

To be honest it's the first time I run such a command (export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json")
I thought export and paths where only used in js files...

Anyway, thanks again!
Wish you the best!
---

### lecture 2
- Learn JavaScript Promises (Pt.1) with HTTP Triggers in Cloud Functions - Firecasts
* The firebase " admin SDK " will return a promise when you ask it to do things like: 
- Read or write from a database
- Interact with files in Cloud Storage
- Send a notification with Cloud Messaging
- Update an authenticated user profile
* You need to wait for the promise to return before you terminate your function.
* Rules for terminating a Cloud Function:
1. For HTTP triggers (functions): They are terminated after they send a response to the client, using the "response" object. So they send a response at the end.
2. Background triggers (i.e. all other kind of triggers): You need to return a promise, that is finished, only after the work that was started in the function is fully complete. If there is no work to wait on, you can just return "null". But you can't leave any promises dunkling in your functions.

- You can test your code in a cloud function on your computer, before you deploy it.
* To emulate HTTP kind functions, first you need to complile TypeScript to JavaScript. So go to terminal and run: " cd functions " then " npm run-script lint " to check for errors. Note: you need to .catch() errors other wise  you get an error from tslint: "Promises must be handled appropriately".
* Then run: " npm run-script build " to compile TypeScript. This runs the 'build' command that is in the package.json, that " firebase init " set for me. It executes the TypeScript compiler or "tsc". The converted JavaScript appears in the "lib" folder next to "src".
* Then to emulate the function run the firebase cli: " firebase serve --only functions ". This gives a URL on localhost to test the function.
* http://localhost:5000/cloud-functions-13401/us-central1/getBostonWeather
* In case your run it again and you get an error just restart your code editor. [Check this](https://stackoverflow.com/questions/57537355/firebase-serve-error-port-5000-is-not-open-could-not-start-functions-emulator). 
* You can then either cmd + click on the link, or use curl + link in the terminal.

* Description content of video:
* Cloud Functions for Firebase → https://goo.gl/DGzP7p
* Write HTTP Triggers → https://goo.gl/vHdPYv
* Functions SDK API documentation → https://goo.gl/ReqpUX
* Admin SDK documentation → https://goo.gl/Ng9X6D

* Cloud Functions for Firebase - Tutorials → http://bit.ly/2M2ZBcE
* Subscribe to the Firebase channel → http://bit.ly/

- Check also on the video comments the way to run cloud functions on a local host


Επισημασμένη απάντηση
Learn to Code
Πριν από 17 ώρες
That's because you are not logged in and cannot read data from firebase database/cloud.
You need  download the  json key and set it up in environments variables as it is described here: https://firebase.google.com/docs/functions/local-emulator#windows
https://console.cloud.google.com/iam-admin/serviceaccounts

1


fooTios
fooTios
Πριν από 11 ώρες (τροποποιήθηκε)
@Learn to Code 
Thanks a lot! It worked!

I went to Google Cloud Platform I searched for 'App Engine default service account ', found the one for this project, selected it, created a key, downloaded in the functions folder, as JSON and then I run 

$ export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
$ firebase emulators:start

To be honest it's the first time I run such a command (export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json")
I thought export and paths where only used in js files...

Anyway, thanks again!
Wish you the best!

### lecture 3
- Learn JavaScript Promises (Pt. 2) with a Firestore Trigger in Cloud Functions - Firecasts
* We're going to write a Firebase trigger, that fires in response to documents updates. With each update, we'll use cloud messaging to send a notification to our app to indicate
the change in the cities-weather document. Like this the app stays always up to date, even when it's not running.

* Description content of video:
* Cloud Functions for Firebase → https://goo.gl/uEp8F3
* Write Firestore Triggers → https://goo.gl/tmz3fq
* Functions SDK API documentation → https://goo.gl/nzq5QM
* Firestore API documentation → https://goo.gl/1gKP5b
* Admin SDK documentation → https://goo.gl/ANGVKj
* Firebase Cloud Messaging → https://goo.gl/tSHqeb

* Cloud Functions for Firebase - Tutorials → http://bit.ly/ 2M2ZBcE
* Subscribe to the Firebase channel → http://bit.ly/

- Check also on the video comments the way to run cloud functions on a local host


Επισημασμένη απάντηση
Learn to Code
Πριν από 17 ώρες
That's because you are not logged in and cannot read data from firebase database/cloud.
You need  download the  json key and set it up in environments variables as it is described here: https://firebase.google.com/docs/functions/local-emulator#windows
https://console.cloud.google.com/iam-admin/serviceaccounts

1


fooTios
fooTios
Πριν από 11 ώρες (τροποποιήθηκε)
@Learn to Code 
Thanks a lot! It worked!

I went to Google Cloud Platform I searched for 'App Engine default service account ', found the one for this project, selected it, created a key, downloaded in the functions folder, as JSON and then I run 

$ export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
$ firebase emulators:start

To be honest it's the first time I run such a command (export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json")
I thought export and paths where only used in js files...

Anyway, thanks again!
Wish you the best!

### lecture 4
- Learn JavaScript Promises (Pt 3) for sequential and parallel work in Cloud Functions - Firecasts

Cloud Functions for Firebase → https://goo.gl/GfavtU
Write HTTP Triggers → https://goo.gl/yA7bW9
Functions SDK API documentation → https://goo.gl/oTiDh6
Admin SDK documentation → https://goo.gl/n5YN5b

### lecture 5
- How does async/await work with TypeScript and ECMAScript 2017? - Firecasts

### lecture 6
- Use async/await with TypeScript in Cloud Functions for Firebase - Firecasts

### lecture 6
- Realtime Database triggers (pt. 1) with Cloud Functions for Firebase - Firecasts

### lecture 7
- Personal notes: In this lecture we use cloud functions with a Real Time Database. There could be a way to have two different firebase accounts in one app, but we skip that for now. So we created another firebase account and another app to follow the next lectures. Check the code for lecture 7 etc in an other repo named `cloud-functions-2-firecasts-RTDatabase`. 





