import React from 'react';
import {Text, View} from 'react-native';
import Calendar from '../components/CustomizedCalendar';

import Colors from '../utils/Colors';

const TaskEditionScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.theme}}>
      <Calendar />
    </View>
  );
};

export default TaskEditionScreen;
