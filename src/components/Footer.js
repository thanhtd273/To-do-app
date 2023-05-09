import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../utils/Colors';
import AddButton from './AddButton';
import IconButton from './UI/IconButton';
import {removeUser, setUser} from '../reducers/user';
import {setTasks} from '../reducers/task';

const Footer = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const handlePressAddButton = () => {
    navigation.navigate('ManageTask', {userID: user.id});
  };
  const logout = () => {
    dispatch(removeUser());
    dispatch(setTasks([]));
  };
  return (
    <View style={styles.container}>
      <AddButton onPress={handlePressAddButton} />
      <IconButton
        icon="logout"
        size={72}
        color="red"
        style={{width: 50, height: 50}}
        onPress={logout}
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
