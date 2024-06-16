const admin = require('firebase-admin');
const fcm = require('fcm-notification');
const mysql = require('../config/db')
const serviceAccount = require('../cbcapp-fd2b5-firebase-adminsdk-x9h2j-9a6eb1d44f.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add any other configurations if needed
});

const FCM = new fcm(admin.credential.cert(serviceAccount));
exports.sendPushNotificationToTopic = async (req, res, next) => {
    try {
        const message = {
            notification: {
                title: req.body.title,
                body: req.body.body,
            },
            apns: {
                payload: {
                   aps: {
                       badge: 1,
                   }
                }
           },
            topic: 'offers',
        };

        const response = await admin.messaging().send(message);

        // Insert notification details into MySQL table
        const insertQuery = `INSERT INTO notifications (title, body) VALUES (?, ?)`;
        const insertValues = [req.body.title, req.body.body];

        mysql.query(insertQuery, insertValues, (error, results) => {
          if (error) {
            console.error('Error inserting notification into MySQL:', error);
            return res.status(500).send({
              message: "Error sending notification: " + error.message
            });
          }
          console.log('Notification inserted into MySQL:', results);
        });

        return res.status(200).send({
            message: "Notification Sent"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Error sending notification: " + e.message
        });
    }
};
