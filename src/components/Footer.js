import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '../utils/Colors';
import AddButton from './AddButton';
import IconButton from './UI/IconButton';

const Footer = () => {
  const navigation = useNavigation();
  const handlePressAddButton = () => {
    navigation.navigate('ManageTask');
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon="view-list"
        size={84}
        color="#48497b"
        style={styles.pressedView}
      />
      <AddButton onPress={handlePressAddButton} />
      <IconButton
        icon="view-module"
        size={84}
        color="#48497b"
        style={styles.pressedView}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: Colors.theme,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  view: {},
  pressedView: {
    width: 48,
    height: 48,
    backgroundColor: Colors.bluePurple,
  },
});
