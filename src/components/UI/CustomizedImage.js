import React from 'react';
import {StyleSheet, Image, View, Pressable} from 'react-native';

const CustomizedImage = ({src, style}) => {
  return (
    <Pressable style={({pressed}) => pressed && {opacity: 0.75}}>
      <Image source={src} style={[styles.image, style]}></Image>
    </Pressable>
  );
};

export default CustomizedImage;

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 24,
    marginRight: 12,
  },
});
