import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';

import IconButton from '../components/UI/IconButton';
import Timing from '../components/UI/Timing';
import Colors from '../utils/Colors';
import {addTask} from '../components/redux/tasks';
import TitleInput from '../components/ManageTask/TitleInput';
import Category from '../components/ManageTask/Category';
import Attachment from '../components/ManageTask/Attachment';
import {changeSubject} from '../components/redux/subject';

const ManageTask = ({route, navigation}) => {
  const tasks = useSelector(state => state.tasks.tasks);
  const subject = useSelector(state => state.subject);
  const dispatch = useDispatch();
  const [isOpenDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminder, setReminder] = useState(new Date());
  const [isOpenReminder, setOpenReminder] = useState(false);

  const [inputs, setInputs] = useState({
    title: '',
    subject: '',
    deadline: '',
    reminders: [],
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs(currentInput => {
      return {...currentInput, [inputIdentifier]: enteredValue};
    });
  };

  const edittedTaskId = route.params?.id;
  const isEdditing = !!edittedTaskId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdditing ? 'Edit Task' : 'New Task',
    });
  }, [navigation, isEdditing]);

  const formatDate = date => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
    }).format(date);
  };

  const handleSettingDate = date => {
    setOpenDate(false);
    setSelectedDate(date);
  };

  const handleSettingReminder = date => {
    setOpenReminder(false);
    setReminder(date);
  };
  useEffect(() => {
    if (typeof subject === 'string') {
      setInputs(currentInput => {
        return {
          ...currentInput,
          subject: subject,
          reminders: isEdditing
            ? [...currentInput.reminders, reminder.toString()]
            : [reminder.toString()],
          deadline: selectedDate.toString(),
        };
      });
    }
  }, [subject]);
  const handleConfirm = () => {
    dispatch(addTask(inputs));
    dispatch(changeSubject({subject: 'All'}));
    navigation.goBack();
  };
  // console.log('Input: ', inputs);
  // console.log('Task: ', tasks);
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
            onChangeText: inputChangeHandler.bind(this, 'title'),
            value: inputs.title,
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
  },
  text: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
});
