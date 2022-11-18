import {Icon} from '@rneui/themed';
import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import SubjectItem from './SubjectItem';

const IconButton = ({icon, size, color}) => {
  return (
    <Pressable style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.button, {width: size, height: size}]}>
        <Icon name={icon} size={size / 2} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#545bff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
