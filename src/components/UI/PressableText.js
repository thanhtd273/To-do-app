import React from 'react';
import {StyleSheet} from 'react-native';
import {Pressable, Text} from 'react-native';

const PressableText = ({children, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => pressed && {opacity: 0.5}}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default PressableText;

const styles = StyleSheet.create({
  text: {
    color: '#6472ca',
    fontSize: 18,
  },
});
