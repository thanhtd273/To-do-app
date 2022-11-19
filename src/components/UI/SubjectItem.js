import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '@rneui/themed';

const SubjectItem = ({icon, color, subject, style}) => {
  return (
    <Pressable style={styles.container}>
      <View style={[styles.subject, style]}>
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
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
