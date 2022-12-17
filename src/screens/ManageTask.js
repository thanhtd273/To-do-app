import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';

import IconButton from '../components/UI/IconButton';
import Timing from '../components/UI/Timing';
import Colors from '../utils/Colors';
import {addTask, deleteTask, updateCompletion} from '../components/redux/tasks';
import TitleInput from '../components/ManageTask/TitleInput';
import Category from '../components/ManageTask/Category';
import Attachment from '../components/ManageTask/Attachment';
import {changeSubject} from '../components/redux/subject';
import {
  deleteTaskToBackend,
  storeNewTask,
  updateTaskToBackend,
} from '../utils/http';
import {updateTask} from '../components/redux/tasks';
import {useRef} from 'react';

const ManageTask = ({route, navigation}) => {
  const tasks = useSelector(state => state.tasks.tasks);
  const subject = useSelector(state => state.subject);
  const dispatch = useDispatch();
  const [isOpenDate, setOpenDate] = useState(false);
  const [isOpenReminder, setOpenReminder] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdditing ? 'Edit Task' : 'New Task',
      headerRight: () =>
        isEdditing && (
          <IconButton
            icon={'delete'}
            size={72}
            color="red"
            onPress={handleDeletion}
          />
        ),
    });
  }, [navigation, isEdditing]);

  const edittedTaskId = route.params?.id;
  const edittedSubjId = route.params?.subjectId;
  const isEdditing = !!edittedTaskId;

  let edittedTask = {};
  for (const item of tasks) {
    for (const task of item?.tasks) {
      if (task.id === edittedTaskId)
        edittedTask = {...task, subjectId: item.id};
    }
  }
  const title = useRef(isEdditing ? edittedTask.title : '');
  const inputChangeHandler = text => {
    title.current = text;
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [reminder, setReminder] = useState(today);

  const formatDate = date => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
    }).format(date);
  };
  useEffect(() => {
    if (isEdditing) {
      const edittedDate = new Date(edittedTask.deadline);
      const edittedReminder = new Date(edittedTask.reminder);
      setSelectedDate(edittedDate);
      setReminder(edittedReminder);
    }
  }, []);

  const handleSettingDate = date => {
    setOpenDate(false);
    setSelectedDate(date);
  };

  const handleSettingReminder = date => {
    setOpenReminder(false);
    setReminder(date);
  };

  const handleConfirm = () => {
    const input = {
      subjectId: isEdditing
        ? edittedSubjId
        : tasks.find(item => item.subject === subject).id,
      subject: subject,
      data: {
        title: title.current,
        deadline: selectedDate.toString(),
        reminder: isEdditing ? reminder.toString() : reminder.toString(),
        isCompleted: false,
      },
    };
    // console.log(tasks);
    if (isEdditing) {
      dispatch(
        updateTask({
          id: edittedTaskId,
          subjectId: edittedSubjId,
          data: input.data,
        }),
      );
      updateTaskToBackend(input.subjectId, edittedTaskId, input.data);
      dispatch(updateCompletion({subjectId: edittedSubjId, id: edittedTaskId}));
    } else {
      storeNewTask(input.subjectId, input.data);
      dispatch(addTask(input));
    }

    navigation.goBack();
  };
  const handleDeletion = () => {
    console.log('Deletion');
    deleteTaskToBackend(edittedSubjId, edittedTaskId);
    dispatch(deleteTask({id: edittedTaskId, subjectId: edittedSubjId}));
    navigation.goBack();
  };
  return (
    <>
      <DatePicker
        modal
        mode="datetime"
        date={selectedDate}
        open={isOpenDate}
        onConfirm={handleSettingDate}
        onCancel={() => setOpenDate(false)}
      />
      <DatePicker
        modal
        mode="datetime"
        date={reminder}
        open={isOpenReminder}
        onConfirm={handleSettingReminder}
        onCancel={() => setOpenReminder(false)}
      />
      <View style={[styles.container]}>
        <TitleInput
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this),
            defaultValue: isEdditing ? edittedTask.title : '',
          }}
        />
        <Category />
        <Attachment />
        <View style={styles.timeContainer}>
          <Timing
            title="Set Due Date"
            onPress={() => setOpenDate(true)}
            time={formatDate(selectedDate)}
          />
          <Timing
            title="Set Reminder"
            onPress={() => setOpenReminder(true)}
            time={formatDate(reminder)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            text={isEdditing ? 'UPDATE TASK' : 'ADD TASK'}
            size={96}
            style={styles.button}
            onPress={handleConfirm}
          />
        </View>
      </View>
    </>
  );
};

export default ManageTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: Colors.theme,
  },
  popupCalendar: {
    top: 24,
    left: 12,
    right: 12,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timeContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.textTheme,
    borderBottomWidth: 1,
  },

  buttonContainer: {
    flex: 0.15,
    marginVertical: 12,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '80%',
    padding: 12,
    backgroundColor: Colors.bluePurple,
  },
  text: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
});
