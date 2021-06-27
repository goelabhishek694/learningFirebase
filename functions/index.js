const functions = require("firebase-functions");
const cors=require("cors")({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// http req 1 eslint error for indentation
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  res.send(number.toString());
});

// http req 2
exports.toAnotherWebsite=functions.https.onRequest((req, res)=>{
  res.redirect("https://www.zunroof.com/");
});

// http callable function
exports.sayHello=functions.https.onCall((data, context)=>{
  return cors((req, res)=>{
    const name=data.name;
    const auth=context;
    // eslint-disable-next-line quotes
    return `hello ${name} how are ${auth}`;
  });
});
