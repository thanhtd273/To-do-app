import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import SubjectBar from '../components/SubjectBar';
import IconButton from '../components/UI/IconButton';
import Colors from '../utils/Colors';

const CreateNewTaskScreen = () => {
  const subjectState = useSelector(state => state.subject);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} multiline={true} />
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.text}>Choose category</Text>
        <SubjectBar isContainedAll={false} />
      </View>
      <View style={styles.attachmentContainer}>
        <Text style={styles.text}>Add attachment</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.text}>TIME</Text>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton text="ADD TASK" size={96} style={styles.button} />
      </View>
    </View>
  );
};

export default CreateNewTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: Colors.theme,
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
    backgroundColor: Colors.theme,
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
  timeContainer: {
    flex: 0.3,
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
