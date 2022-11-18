import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text>Footer</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: 'white',
  },
});
