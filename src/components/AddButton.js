import {Icon} from '@rneui/themed';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AddButton = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <LinearGradient
          colors={['#fdc358', '#fa709b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.button}>
          <Icon name="add" color="#000" size={42} />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
