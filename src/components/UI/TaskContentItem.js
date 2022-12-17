import {CheckBox, Icon} from '@rneui/themed';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCompletionToBackend} from '../../utils/http';
import {updateCompletion} from '../redux/tasks';

const TaskContentItem = ({
  title,
  deadline,
  subjectIcon,
  subjectIconColor,
  subject,
  isCompleted,
  onPress,
}) => {
  const {tasks} = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const formatTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(deadline));

  const subjId = tasks.find(item => item.subject === subject).id;
  const id = tasks
    .find(item => item.subject === subject)
    .tasks.find(task => task.title === title).id;
  const handlePressingCheckbox = () => {
    dispatch(updateCompletion({subjectId: subjId, id: id}));
    updateCompletionToBackend(subjId, id);
  };
  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.abovePart}>
          <CheckBox
            checked={isCompleted}
            title={title}
            onPress={handlePressingCheckbox}
            containerStyle={styles.checkbox}
            textStyle={[
              styles.title,
              isCompleted && {textDecorationLine: 'line-through'},
            ]}
          />
        </View>

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
