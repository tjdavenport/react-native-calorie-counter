import * as ctx from './contexts';
import * as rN from 'react-navigation';
import { styles, colors } from './styles';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const AddFood = rN.withNavigation(function (props) {
  const food = props.navigation.getParam('food', props.food);
  const brand = (food.food_type === 'Brand') ? food.brand_name : 'Generic';
  const [ quantity, setQuantity ] = useState(0);
  const diaryCtx = useContext(ctx.Diary);

  const onAdd = () => {
    diaryCtx.addFood(food, quantity);
    props.navigation.navigate('Home');
  };
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.textLg}>{food.food_name}</Text>
      <Text style={[styles.textMd, { color: colors.orange }]}>{brand}</Text>
      <TextInput
        autoFocus={true}
        keyboardType={'numeric'}
        style={{ color: colors.cyan, fontSize: 32, marginTop: 16, marginBottom: 16 }}
        placeholder={'set quantity'}
        placeholderTextColor={colors.white}
        onChangeText={text => {
          setQuantity(parseInt(text));
        }}
      />
      <TouchableOpacity style={styles.btn} onPress={onAdd}>
        <Text style={styles.textMd}>add to diary</Text>
      </TouchableOpacity>
    </View>
  );
});

export default AddFood;
