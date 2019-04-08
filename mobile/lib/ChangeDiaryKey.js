import * as ctx from './contexts';
import * as rN from 'react-navigation';
import { styles, colors } from './styles';
import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, DatePickerIOS, Text } from 'react-native';

const ChangeDiaryKey = rN.withNavigation(function (props) {
  const diaryCtx = useContext(ctx.Diary);
  const diaryKeyDate = new Date(parseInt(diaryCtx.diaryKey));
  const [ selectedDate, setSelectedDate ] = useState(diaryKeyDate);

  const onPress = () => {
    const diaryKeyDate = new Date(
      selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()
    );
    diaryCtx.setDiaryKey(diaryKeyDate.getTime().toString());
    props.navigation.navigate('Home');
  };
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <DatePickerIOS 
        mode={'date'} 
        date={selectedDate} 
        onDateChange={newDate => {
          setSelectedDate(newDate);
      }}/>
      <TouchableOpacity style={[styles.btn, { alignItems: 'center' }]} onPress={onPress}>
        <Text style={styles.text}>change date</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ChangeDiaryKey;
