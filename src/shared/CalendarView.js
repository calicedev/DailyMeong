import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';



function CalendarView() {



  return (
    <Calendar
      style={styles.calendar}
      markedDates={{
        '2021-12-16': {selected: true, marked: true, selectedColor: '#F3C757'},
        '2021-12-17': {selected: true,marked: true, selectedColor: '#F3C757'},
      }}
      onDayPress={day => {
        
      }}
      theme={{
        selectedDayBackgroundColor: '#F3C757',
        arrowColor: '#F3C757',
        dotColor: '#F3C757',
        todayTextColor: '#F3C757',
        fontFamily: "NanumSquareRoundEB",
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: 350,
    fontFamily: "NanumSquareRoundEB",
    
  },
});

export default CalendarView;
