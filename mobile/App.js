import Home from './lib/Home';
import Search from './lib/Search';
import AddFood from './lib/AddFood';
import Results from './lib/Results';
import { styles } from './lib/styles';
import * as ctx from './lib/contexts';
import * as rN from 'react-navigation';
import UpdateFood from './lib/UpdateFood';
import ChangeDiaryKey from './lib/ChangeDiaryKey';
import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

const stack = rN.createStackNavigator({
  Home, Search, Results, AddFood, UpdateFood, ChangeDiaryKey,
});
const AppContainer = rN.createAppContainer(stack);

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export default function App() {
  const [ entries, setEntries ] = useState([]);
  const [ diaryKey, setDiaryKey ] = useState(today.getTime().toString());

  useEffect(() => {
    AsyncStorage
      .getItem(diaryKey)
      .then(diary => {
        setEntries(JSON.parse(diary) || []);
      })
      .catch(err => {
        // TODO
      });
  }, [ diaryKey ]);

  function writeDiary(newDiary) {
    return AsyncStorage
      .setItem(diaryKey, JSON.stringify(newDiary))
      .catch(err => {
        // TODO
      });
  }

  const diaryCtx = {
    diaryKey,
    entries,
    setDiaryKey,
    addFood(food, quantity) {
      const newDiary = entries.concat({ food, quantity });
      writeDiary(newDiary);
      setEntries(newDiary);
    },
    updateFood(food, quantity) {
      const target = entries.find(entry => {
        return (food.food_id === entry.food.food_id);
      });
      target.quantity = quantity;

      const newEntries = entries.filter(entry => {
        return (food.food_id !== entry.food.food_id);
      });
      newEntries.unshift(target);
      writeDiary(newEntries);
      setEntries(newEntries);
    },
    removeFood(food) {
      const newEntries = entries.filter(entry => {
        return (food.food_id !== entry.food.food_id);
      });
      writeDiary(newEntries);
      setEntries(newEntries);
    },
  };

  return (
    <View style={styles.container}>
      <ctx.Diary.Provider value={diaryCtx}>
        <AppContainer/>
      </ctx.Diary.Provider>
    </View>
  );
}
