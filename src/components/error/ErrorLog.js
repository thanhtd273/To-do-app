import React from 'react';
import {Alert} from 'react-native';

export const createPlainErrorLog = (title, message) => {
  return Alert.alert(title, message);
};

export const createErrorLog = ({title, message, onAgree}) => {
  return Alert.alert(title, message, [
    {
      text: 'Try again',
      style: 'cancel',
      onPress: onAgree,
    },
    {
      text: 'Cancel',
    },
  ]);
};
