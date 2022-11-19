import {CheckBox, Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const TaskContentItem = ({
  title,
  deadline,
  subjectIcon,
  subjectIconColor,
  subject,
}) => {
  const [check, setCheck] = useState(deadline < new Date());
  const formatTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(deadline);
  return (
    <Pressable style={({pressed}) => pressed && styles.pressed}>
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
            <Text style={styles.timeText}>{formatTime}</Text>
            <Icon name="alarm" color={'#64668c'} />
          </View>
          <View style={styles.bottomLeftPart}>
            <Icon name={subjectIcon} color={subjectIconColor} size={24} />
            <Text style={styles.timeText}>{subject}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskContentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#121230',
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.75,
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
    marginLeft: 18,
    marginRight: 4,
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
  bottomLeftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
