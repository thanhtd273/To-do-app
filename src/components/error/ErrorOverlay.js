import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ErrorOverlay = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.error}>ERROR MESSAGE</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    width: width * 0.6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  error: {
    color: 'red',
  },
});
