import axios from 'axios';
import {getFCMToken} from './configueNotification';

export const pushNotification = async (notification, data = {}) => {
  const token = await getFCMToken();
  const SERVER_KEY =
    'AAAA3ACYC-E:APA91bH4RiF-E3LRlxsLEdWw-SJ8WolJSKrXaUt2dnT9T7T1CYl6uApDZ1AtjSEj7HUcZEiKNi0kYqvlaBWdDIRWTRDfB-SGomNPrG8uRZCr1i1pABJOMPpVVffQTHSgC0qGPLeSYj_o';
  const messageBody = {
    notification: {
      body: notification.body,
      title: notification.title,
    },
    to: token,
  };
  try {
    await axios.post(
      `https://fcm.googleapis.com/fcm/send`,
      JSON.stringify(messageBody),
      {
        headers: {
          Authorization: `key=${SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Notification sent successfully');
  } catch (error) {
    console.log('Error sending notification:', error);
  }
};
