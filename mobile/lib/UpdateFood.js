import * as ctx from './contexts';
import * as rN from 'react-navigation';
import { styles, colors } from './styles';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const UpdateFood = rN.withNavigation(function (props) {
  const food = props.navigation.getParam('food', props.food);
  const brand = (food.food_type === 'Brand') ? food.brand_name : 'Generic';
  const [ quantity, setQuantity ] = useState(
    props.navigation.getParam('quantity', props.quantity)
  );
  const diaryCtx = useContext(ctx.Diary);

  const onUpdate = () => {
    diaryCtx.updateFood(food, quantity);
    props.navigation.navigate('Home');
  };

  const onRemove = () => {
    diaryCtx.removeFood(food);
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
        defaultValue={quantity + ''}
        placeholderTextColor={colors.white}
        onChangeText={text => {
          if (text) {
            setQuantity(parseInt(text));
          } else {
            setQuantity('');
          }
        }}
      />
      <TouchableOpacity style={styles.btn} onPress={onUpdate}>
        <Text style={styles.textMd}>update entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={onRemove}>
        <Text style={styles.textMd}>remove from diary</Text>
      </TouchableOpacity>
    </View>
  );
});

export default UpdateFood;
