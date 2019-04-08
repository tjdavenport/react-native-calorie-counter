import http from './http';
import FoodItem from './FoodItem';
import * as rN from 'react-navigation';
import { styles, colors } from './styles';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';

const Results = rN.withNavigation(function (props) {
  const [ results, setResults ] = useState([]);
  const [ page, setPage ] = useState(0); 
  const [ ended, setEnded ] = useState(false);
  const onEndReached = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!ended) {
      http.get('/foods/search', {
        params: {
          expression: props.navigation.getParam('expression'),
          page,
        },
      }).then(res => {
        if (res.data.foods.food) {
          setResults(results.concat(res.data.foods.food));
        } else {
          setEnded(true);
        }
      });
    }
  }, [ page ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        onEndReachedThreashold={0.75}
        onEndReached={onEndReached}
        renderItem={({ item }) => {
          const onFoodItemPress = e => {
            props.navigation.navigate('AddFood', {
              food: item,
            });
          };
          return <FoodItem food={item} quantity={1} onPress={onFoodItemPress}/>;
        }}
      />
    </View>
  )
});

export default Results;
