import * as rN from 'react-navigation';
import React, { useState } from 'react';
import { styles, colors } from './styles';
import { TextInput, View } from 'react-native';

const Search = rN.withNavigation(function (props) {
  const onSubmit = e => {
    props.navigation.navigate('Results', {
      expression: e.nativeEvent.text,
    });
  };

  return (
    <View style={[ styles.container, styles.center ]}>
      <TextInput
        autoFocus={true}
        style={{ color: colors.cyan, fontSize: 32 }}
        placeholder={'search for food'}
        placeholderTextColor={colors.white}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
});

export default Search;
