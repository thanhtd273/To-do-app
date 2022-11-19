import {CheckBox, Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TaskContentItem = ({title, deadline, subjectIcon, subjectIconColor}) => {
  const [check, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <CheckBox
        checked={check}
        title={title}
        onPress={() => setCheck(!check)}
        containerStyle={styles.checkbox}
        textStyle={[
          styles.title,
          check && {textDecorationLine: 'line-through'},
        ]}
      />
      <View style={styles.bottomPart}>
        <View style={styles.time}>
          <Icon name="access-time" color={'#64668c'} />
          <Text style={styles.timeText}>{deadline}</Text>
          <Icon name="alarm" color={'#64668c'} />
        </View>
        <View>
          <Icon name={subjectIcon} color={subjectIconColor} size={24} />
        </View>
      </View>
    </View>
  );
};

export default TaskContentItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 6,
    height: 72,
    backgroundColor: '#121230',
    borderRadius: 12,
  },
  checkbox: {
    height: '50%',
    backgroundColor: '#121230',
    paddingVertical: 0,
    marginBottom: 0,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  bottomPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 18,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#fff',
    marginHorizontal: 12,
  },
});
