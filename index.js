const express = require('express')
const app = express()

var admin = require("firebase-admin");
var serviceAccount = require("./face-call-connect-firebase-adminsdk-kmv8u-33ec6c24df.json");

const port = 3000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://face-call-connect-default-rtdb.firebaseio.com"
});

app.use(express.json())

app.post('/send-notification', ( req, res ) => {
  const { notificationData } = req.body;

  if (notificationData) {
    admin
      .messaging()
      .send(notificationData)
      .then(response => {
        console.log('Notification sent successfully:', response);
        res.status(200).json({ message: 'Notification sent successfully' });
      })
      .catch(error => {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Error sending notification' });
      });
  } else {
    res.status(400).json({ error: 'Invalid notification data' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})