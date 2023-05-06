import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import Colors from '../../utils/Colors';

const FlatButton = ({style, title, onPress}) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed ? [{width: '90%', opacity: 0.5}] : {width: '90%'}
      }
      onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  container: {
    height: 54,
    width: '100%',
    backgroundColor: Colors.bluePurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
});
