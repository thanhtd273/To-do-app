import {CheckBox} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {updateTaskStatus} from '../../reducers/task';
import {updateTaskToBackend} from '../../utils/functions/communicateDatabase';

const TaskContentItem = ({task, onPress}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isCompleted, setCompleted] = useState(
    task.data.status === 'done' ||
      new Date(task.data.deadline) - new Date() < 0,
  );

  // Automatic update status if deadline passed
  useEffect(() => {
    if (new Date(task.data.deadline) < new Date()) {
      dispatch(updateTaskStatus({id: task.id}));
      updateTaskToBackend({
        userID: user.id,
        id: task.id,
        data: {
          title: task.data.title,
          deadline: task.data.deadline,
          reminder: task.data.reminder,
          category: task.data.category,
          status: 'done',
        },
        token: user.token,
      });
      setCompleted(true);
    }
  }, []);
  const toggleTaskStatus = () => {
    if (new Date(task.data.deadline) - new Date() > 0) {
      dispatch(updateTaskStatus({id: task.id}));
      updateTaskToBackend({
        userID: user.id,
        id: task.id,
        data: {
          title: task.data.title,
          deadline: task.data.deadline,
          reminder: task.data.reminder,
          category: task.data.category,
          status: isCompleted ? 'doing' : 'done',
        },
        token: user.token,
      });
      setCompleted(!isCompleted);
    }
  };

  const formatTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(task.data.deadline));

  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.abovePart}>
          <CheckBox
            checked={isCompleted}
            title={task.data.title}
            containerStyle={styles.checkbox}
            textStyle={[
              styles.title,
              isCompleted && {
                textDecorationLine: 'line-through',
              },
            ]}
            onPress={toggleTaskStatus}
          />
        </View>

        <View style={styles.bottomPart}>
          <View style={styles.time}>
            <Icon name="clock-outline" color={'#64668c'} size={24} />
            <Text style={styles.timeText}>{formatTime}</Text>
            <Icon name="alarm" color={'#64668c'} size={24} />
          </View>
          <View style={styles.bottomLeftPart}>
            <Icon name={task.data.icon} color={task.data.color} size={24} />
            <Text style={styles.timeText}>{task.data.category}</Text>
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
    marginVertical: 6,
    backgroundColor: '#121230',
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.75,
  },
  abovePart: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    width: '80%',
    backgroundColor: '#121230',
    paddingVertical: 0,
    marginBottom: 0,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  bottomPart: {
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignSelf: 'center',
  },
  bottomLeftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
