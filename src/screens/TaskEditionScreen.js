import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import Colors from '../utils/Colors';
import CustomizedCalendar from '../components/CustomizedCalendar';

const TaskEditionScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.theme}}>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        mode="datetime"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => setOpen(false)}
        locale="en-US"
        textColor={Colors.textTheme}
      />
    </View>
  );
};

export default TaskEditionScreen;
