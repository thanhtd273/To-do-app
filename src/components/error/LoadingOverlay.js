import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

import Colors from '../../utils/Colors';

const LoadingOverlay = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.theme,
  },
  message: {
    color: Colors.textColor,
    fontSize: 16,
    marginBottom: 12,
  },
});
