import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const getFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error, 'error in fcmtoken');
    }
  }
  console.log(fcmtoken);
  return fcmtoken;
};

const NotificationListener = () => {
  // Assuming a message-notification container a "type" property in the data payload of the screen
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notifiation caused app to open from the background state',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state: ',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification from foreground state ...', remoteMessage);
  });
};

export {requestUserPermission, NotificationListener, getFCMToken};
