require('dotenv').config()
const admin = require("firebase-admin")

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.firebaseConfig))
});

exports.sendFCM = (message, target_id) => {
    let payload = {
        notification: {
            title: "Incoming message",
            body: message
        },
        token: target_id
    }

    adminApp.messaging().send(payload).then( res => {
        return res;
    }).catch( error => {
        console.log(error);
        return 500
    })
}

