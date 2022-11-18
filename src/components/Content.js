import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Content = () => {
  return (
    <View style={styles.container}>
      <Text>Content</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: '#ccc',
  },
});
