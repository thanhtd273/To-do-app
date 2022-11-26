import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = ({open}) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setOpen] = useState(open);
  return (
    <DatePicker
      modal
      mode="datetime"
      open={isOpen}
      onConfirm={date => {
        setDate(date);
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    />
  );
};

export default DateTimePicker;
