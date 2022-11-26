import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';

import SubjectBar from '../components/SubjectBar';
import CustomizedImage from '../components/UI/CustomizedImage';
import IconButton from '../components/UI/IconButton';
import Timing from '../components/UI/Timing';
import Colors from '../utils/Colors';

const CreateNewTaskScreen = () => {
  const subjectState = useSelector(state => state.subject);
  const [pressedCalendar, setPressCalendar] = useState(false);
  const formatDate = date => {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
    }).format(date);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpenDate, setOpenDate] = useState(false);

  const [reminder, setReminder] = useState(new Date());
  const [isOpenReminder, setOpenReminder] = useState(false);
  const handleSettingDate = date => {
    setOpenDate(false);
    setSelectedDate(date);
  };

  const handleSettingReminder = date => {
    setOpenReminder(false);
    setReminder(date);
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
      <Pressable style={{flex: 1}}>
        <View style={[styles.container]}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} multiline={true} />
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.text}>Choose category</Text>
            <SubjectBar isContainedAll={false} />
          </View>
          <View style={styles.attachmentContainer}>
            <Text style={styles.text}>Add attachment</Text>
            <View style={styles.imageContainer}>
              <CustomizedImage
                src={require('../utils/images/attachment.png')}
                style={{
                  borderWidth: 2,
                  borderRadius: 24,
                  borderColor: '#fff',
                }}
              />
              <CustomizedImage
                src={require('../utils/images/laboratory.jpg')}
              />
              <CustomizedImage
                src={require('../utils/images/holy_bible.jpg')}
              />
              <CustomizedImage
                src={require('../utils/images/abstract_background.jpg')}
              />
            </View>
          </View>
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
            <IconButton text="ADD TASK" size={96} style={styles.button} />
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default CreateNewTaskScreen;

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
  inputContainer: {
    flex: 0.15,
    marginHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textTheme,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    marginTop: 12,
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  categoryContainer: {
    flex: 0.2,
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomColor: Colors.textTheme,
    borderBottomWidth: 1,
  },
  attachmentContainer: {
    flex: 0.2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textTheme,
  },
  imageContainer: {
    padding: 12,
    flexDirection: 'row',
  },
  timeContainer: {
    flex: 0.3,
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
