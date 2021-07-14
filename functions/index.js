const { firebaseConfig } = require("firebase-functions");
const functions = require("firebase-functions");
const admin=require("firebase-admin");
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// http req 1 eslint error for indentation
// exports.randomNumber = functions.https.onRequest((req, res) => {
//   const number = Math.round(Math.random() * 100);
//   res.send(number.toString());
// });

// // http req 2
// exports.toAnotherWebsite=functions.https.onRequest((req, res)=>{
//   res.redirect("https://www.zunroof.com/");
// });

// // http callable function
// exports.sayHello=functions.https.onCall((data, context)=>{
//     const name=data.name;
//     const auth=context;
//     // eslint-disable-next-line quotes
//     return `hello ${name} how are ${auth}`;
// });


// auth trigger (new user sign up)
exports.newUserSignUp=functions.auth.user().onCreate((user)=>{
//   console.log("user created", user.email, user.uid);
  // for background triggers you must return a value/promise
//   firebase
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    upVotedOn: []}
  );
});

// auth trigger (user deleted)
exports.deleteUser=functions.auth.user().onDelete((user)=>{
// console.log("user deleted", user.email, user.uid);
  // for background triggers you must return a value/promise
  const doc=admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

exports.addRequest=functions.https.onCall((data, context)=>{
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  if (data.text.length>30) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "request must be less than 30 characters"
    );
  }
//   admin.firestore().collection("requests").add({
//     request: data.text,
//     upvotes: 0}
//   );
// });

