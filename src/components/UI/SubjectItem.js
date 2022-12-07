import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';

import {changeSubject} from '../redux/subject';
import Colors from '../../utils/Colors';

const SubjectItem = ({icon, color, subject, style}) => {
  const dispatch = useDispatch();
  const handlePressSubjectButton = () => {
    dispatch(changeSubject({subject: subject}));
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePressSubjectButton}>
      <View style={styles.subject}>
        {icon && <Icon name={icon} size={20} color={color} />}
        <Text style={styles.text}>{subject}</Text>
      </View>
    </Pressable>
  );
};

export default SubjectItem;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 72,
    marginRight: 8,
    borderRadius: 6,
  },
  subject: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  pressed: {
    opacity: 0.75,
  },
});
