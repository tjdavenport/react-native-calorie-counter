import roundTo from 'round-to';
import FoodItem from './FoodItem';
import * as ctx from './contexts';
import * as rN from 'react-navigation';
import { styles, colors } from './styles';
import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

const DateBar = rN.withNavigation(function (props) {
  const diaryCtx = useContext(ctx.Diary);
  const diaryDate = new Date(parseInt(diaryCtx.diaryKey));

  styles.bar = {
    borderColor: colors.cyan,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  };

  const onPress = () => {
    props.navigation.navigate('ChangeDiaryKey');
  };

  return (
    <View style={styles.bar}>
      <Text style={[styles.text, { flex: 1 }]}>Tracking {diaryDate.toString().substr(0, 15)}</Text>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text styles={styles.text}>edit</Text>
      </TouchableOpacity>
    </View>
  )
});

function Summary(props) {
  const diaryCtx = useContext(ctx.Diary);
  styles.summary = { 
    padding: 8, 
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: colors.cyan,
  };

  const totals = diaryCtx.entries.reduce((current, entry) => {
    const nutrition = entry.food.food_description.split('-')[1];
    const summary = nutrition.match(/[0-9]+\.[0-9]+|[0-9]+/g);

    summary.forEach((value, index) => {
      current[index] += (parseFloat(value) * entry.quantity);
    });

    return current;
  }, [0, 0, 0, 0])

  return (
    <View style={styles.summary}>
      <Text style={{ fontSize: 24, color: colors.white }}>
        {roundTo(totals[0], 1)}
      </Text>
      <Text style={{ fontSize: 24, color: colors.orchid, marginRight: 8 }}>K</Text>
      <Text style={{ fontSize: 24, color: colors.white }}>
        {roundTo(totals[1], 1)}
      </Text>
      <Text style={{ fontSize: 24, color: colors.orchid, marginRight: 8 }}>F</Text>
      <Text style={{ fontSize: 24, color: colors.white }}>
        {roundTo(totals[2], 1)}
      </Text>
      <Text style={{ fontSize: 24, color: colors.orchid, marginRight: 8 }}>C</Text>
      <Text style={{ fontSize: 24, color: colors.white }}>
        {roundTo(totals[3], 1)}
      </Text>
      <Text style={{ fontSize: 24, color: colors.orchid, marginRight: 8 }}>P</Text>
    </View>
  );
}

const Diary = rN.withNavigation(function (props) {
  const diaryCtx = useContext(ctx.Diary);

  const onPress = () => {
    props.navigation.navigate('Search');
  };
  if (diaryCtx.entries.length) {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={diaryCtx.entries}
          renderItem={({ item }) => {
            const onFoodItemPress = e => {
              props.navigation.navigate('UpdateFood', {
                food: item.food,
                quantity: item.quantity,
                removeable: true,
              });
            };
            return <FoodItem food={item.food} quantity={item.quantity} onPress={onFoodItemPress}/>;
          }}
        />
        <TouchableOpacity style={[styles.btn, { alignItems: 'center' }]} onPress={onPress}>
          <Text style={styles.text}>add food</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[{ flex: 1 }, styles.center]}>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.textLg}>add food</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

const Home = rN.withNavigation(function (props) {
  return (
    <View style={styles.container}>
      <DateBar/>
      <Summary/>
      <Diary/>
    </View>
  );
});

export default Home;
