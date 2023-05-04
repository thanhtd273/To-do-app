import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import axios from 'axios';

import Colors from '../utils/Colors';
import AddButton from './AddButton';
import {databaseURL} from '../utils/server/URL';

const Footer = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  useEffect(() => {
    axios.get(`${databaseURL}/users`).then(response => {
      const id = response.data.documents[0].name.split('/').at(-1);
      setUserID(id);
    });
  }, []);
  const handlePressAddButton = () => {
    navigation.navigate('ManageTask', {userID});
  };
  return (
    <View style={styles.container}>
      <AddButton onPress={handlePressAddButton} />
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
