import {Icon} from '@rneui/themed';
import React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';
import Colors from '../../utils/Colors';
import SubjectItem from './SubjectItem';

const IconButton = ({text, icon, size, color, style, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}>
      <View style={[styles.button, {width: size, height: size}, style]}>
        {icon && <Icon name={icon} size={size / 2} color={color} />}
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    borderRadius: 12,
    // backgroundColor: Colors.bluePurple,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
