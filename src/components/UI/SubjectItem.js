import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '@rneui/themed';

const SubjectItem = () => {
  return (
    <Pressable>
      <View style={styles.subject}>
        <Icon name="monitor" size={20} color="#fcaa46" />
        <Text style={styles.text}>Study</Text>
      </View>
    </Pressable>
  );
};

export default SubjectItem;

const styles = StyleSheet.create({
  subject: {
    width: 64,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#545bff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
