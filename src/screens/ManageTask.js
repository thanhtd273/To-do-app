import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import IconButton from '../components/UI/IconButton';
import Timing from '../components/UI/Timing';
import Colors from '../utils/Colors';
import TitleInput from '../components/ManageTask/TitleInput';
import Category from '../components/ManageTask/Category';
import Attachment from '../components/ManageTask/Attachment';
import {
  createNewTaskToBackend,
  deleteTaskToBackend,
  getCategory,
  updateTaskToBackend,
} from '../utils/functions/communicateDatabase';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, deleteTask, updateTask} from '../reducers/task';

const ManageTask = ({route, navigation}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isOpenDate, setOpenDate] = useState(false);
  const [isOpenReminder, setOpenReminder] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Task' : 'New Task',
      headerRight: () =>
        isEditing && (
          <IconButton
            icon={'delete'}
            size={72}
            color="red"
            onPress={handleDeletion}
          />
        ),
    });
  }, [navigation, isEditing]);
  const today = new Date();

  const edittedTaskId = route.params?.id;
  const isEditing = !!edittedTaskId;
  const editedTask = route.params?.data;

  const [inputs, setInputs] = useState({
    title: isEditing ? editedTask.title : '',
    category: isEditing ? editedTask.category : '',
    deadline: isEditing ? editedTask.deadline : today.toISOString(),
    reminder: isEditing ? editedTask.reminder : today.toISOString(),
    status: isEditing ? editedTask.status : 'doing',
  });

  const formatDate = date => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
    }).format(date);
  };

  const setDealine = date => {
    setOpenDate(false);
    setInputs({...inputs, deadline: date.toISOString()});
  };

  const setRemider = date => {
    setOpenReminder(false);
    setInputs({...inputs, reminder: date.toISOString()});
  };

  const handleConfirm = async () => {
    const {icon, color} = await getCategory(inputs.category);
    if (isEditing) {
      updateTaskToBackend({userID: user.id, id: edittedTaskId, data: inputs});
      dispatch(updateTask({id: edittedTaskId, data: {...inputs, icon, color}}));
    } else {
      const id = await createNewTaskToBackend({userID: user.id, data: inputs});
      dispatch(addTask({id, data: {...inputs, icon, color}}));
    }

    navigation.goBack();
  };
  const handleDeletion = () => {
    deleteTaskToBackend({userID: user.id, id: edittedTaskId});
    dispatch(deleteTask({id: edittedTaskId}));
    navigation.goBack();
  };
  return (
    <>
      <DatePicker
        modal
        mode="datetime"
        date={isEditing ? new Date(editedTask.deadline) : today}
        open={isOpenDate}
        onConfirm={setDealine}
        onCancel={() => setOpenDate(false)}
      />
      <DatePicker
        modal
        mode="datetime"
        date={isEditing ? new Date(editedTask.reminder) : today}
        open={isOpenReminder}
        onConfirm={setRemider}
        onCancel={() => setOpenReminder(false)}
      />
      <View style={[styles.container]}>
        <TitleInput
          textInputConfig={{
            onChangeText: text => setInputs({...inputs, title: text}),
            defaultValue: isEditing ? editedTask.title : '',
          }}
        />
        <Category
          category={inputs.category}
          onPress={name => {
            // console.log(name);
            setInputs({...inputs, category: name});
          }}
        />
        <Attachment />
        <View style={styles.timeContainer}>
          <Timing
            title="Set Due Date"
            onPress={() => setOpenDate(true)}
            time={formatDate(new Date(inputs.deadline))}
          />
          <Timing
            title="Set Reminder"
            onPress={() => setOpenReminder(true)}
            time={formatDate(new Date(inputs.reminder))}
          />
        </View>

        <View style={styles.buttonContainer}>
          <IconButton
            text={isEditing ? 'UPDATE TASK' : 'ADD TASK'}
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
