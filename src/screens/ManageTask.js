import React, {useEffect, useLayoutEffect, useState, useReducer} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';

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
import {addTask, deleteTask, updateTask} from '../reducers/task';
import {createPlainErrorLog} from '../components/error/ErrorLog';
import LoadingOverlay from '../components/error/LoadingOverlay';

const ManageTask = ({route, navigation}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isOpenDate, setOpenDate] = useState(false);
  const [isOpenReminder, setOpenReminder] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Task' : 'New Task',
      headerRight: () =>
        isEditing && (
          <IconButton
            icon="delete"
            size={72}
            color="red"
            onPress={handleDeleting}
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
  const reducer = (state, action) => {
    switch (action.type) {
      case 'title':
        return {...state, title: inputs.title !== ''};
      case 'category':
        return {...state, category: inputs.category !== ''};
      case 'deadline':
        if (!isEditing)
          return {...state, deadline: new Date(inputs.deadline) > new Date()};
      case 'reminder':
        if (!isEditing)
          return {...state, reminder: new Date(inputs.deadline) > new Date()};
      default:
        return state;
    }
  };
  const initialState = {
    title: true,
    category: true,
    deadline: true,
    reminder: true,
  };
  const [invalidInputChecker, checkInvalidInput] = useReducer(
    reducer,
    initialState,
  );

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
    checkInvalidInput({type: 'title'});
    checkInvalidInput({type: 'category'});
    checkInvalidInput({type: 'deadline'});
    checkInvalidInput({type: 'reminder'});
    if (
      invalidInputChecker.title &&
      invalidInputChecker.category &&
      invalidInputChecker.deadline &&
      invalidInputChecker.reminder
    ) {
      setLoading(true);
      try {
        const {icon, color} = await getCategory(inputs.category, user.token);
        if (isEditing) {
          updateTaskToBackend({
            userID: user.id,
            id: edittedTaskId,
            data: inputs,
            token: user.token,
          });
          dispatch(
            updateTask({id: edittedTaskId, data: {...inputs, icon, color}}),
          );
        } else {
          const id = await createNewTaskToBackend({
            userID: user.id,
            data: inputs,
            token: user.token,
          });
          dispatch(addTask({id, data: {...inputs, icon, color}}));
        }
        navigation.goBack();
      } catch (error) {
        createPlainErrorLog(
          'Cannot create new task',
          'Please check the input!',
        );
      }
      setLoading(false);
    } else {
      if (!invalidInputChecker.category)
        createPlainErrorLog(
          'Category is empty!',
          'Please choose the category of task',
        );
      if (!invalidInputChecker.deadline)
        createPlainErrorLog(
          'Deadline must be greater than now',
          'Please pick the deadline of task again',
        );
      if (!invalidInputChecker.deadline)
        createPlainErrorLog(
          'Reminder must be greater than now',
          'Please pick the reminder of task again',
        );
    }
  };

  const handleDeleting = async () => {
    setLoading(true);
    try {
      deleteTaskToBackend({
        userID: user.id,
        id: edittedTaskId,
        token: user.token,
      });
      dispatch(deleteTask({id: edittedTaskId}));
      navigation.goBack();
    } catch (error) {
      createPlainErrorLog(
        'Cannot delete this task',
        'Please check your server',
      );
    }

    setLoading(false);
  };

  if (loading) <LoadingOverlay message="Loading" />;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
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
            errorMessage={
              !invalidInputChecker.title && 'Title must not be empty!'
            }
            textInputConfig={{
              onChangeText: text => setInputs({...inputs, title: text}),
              defaultValue: isEditing ? editedTask.title : '',
              onEndEditing: () => checkInvalidInput({type: 'title'}),
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
