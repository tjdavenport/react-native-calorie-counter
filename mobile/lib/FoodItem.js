import roundTo from 'round-to';
import * as rN from 'react-navigation';
import { styles, colors } from './styles';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FoodItem = rN.withNavigation(function (props) {
  styles.foodItem = {
    backgroundColor: colors.white,
    padding: 8,
    borderBottomWidth: 2,
    borderColor: colors.grey,
  };
  styles.foodName = {
    fontSize: 24,
    color: colors.grey,
  };
  styles.brandName = {
    fontSize: 16,
    color: colors.orange
  };

  const [ serving, nutrition ] = props.food.food_description.split('-');
  const summary = nutrition.match(/[0-9]+\.[0-9]+|[0-9]+/g);

  const brand = (props.food.food_type === 'Brand') ? props.food.brand_name : 'Generic';
  const name = (props.quantity > 1) ? 
    props.quantity+'x - '+props.food.food_name : props.food.food_name;
  return (
    <TouchableOpacity style={styles.foodItem} onPress={props.onPress}>
      <Text numberOfLines={1} style={styles.foodName}>{name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, color: colors.grey }}>{serving} - </Text>
        <Text style={{ fontSize: 16, color: colors.grey }}>
          {roundTo(summary[0] * props.quantity, 1)}
        </Text>
        <Text style={{ fontSize: 16, color: colors.orchid, marginRight: 8 }}>K</Text>
        <Text style={{ fontSize: 16, color: colors.grey }}>
          {roundTo(summary[1] * props.quantity, 1)}
        </Text>
        <Text style={{ fontSize: 16, color: colors.orchid, marginRight: 8 }}>F</Text>
        <Text style={{ fontSize: 16, color: colors.grey }}>
          {roundTo(summary[2] * props.quantity, 1)}
        </Text>
        <Text style={{ fontSize: 16, color: colors.orchid, marginRight: 8 }}>C</Text>
        <Text style={{ fontSize: 16, color: colors.grey }}>
          {roundTo(summary[3] * props.quantity, 1)}
        </Text>
        <Text style={{ fontSize: 16, color: colors.orchid, marginRight: 8 }}>P</Text>
      </View>
      <Text style={styles.brandName}>{brand}</Text>
    </TouchableOpacity>
  );
});

export default FoodItem;
