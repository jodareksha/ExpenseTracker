import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';

type CardYetProps = {
  label?: string;
};

const CardYet = ({label}: CardYetProps) => {
  return (
    <View style={style.container}>
      <Text style={style.TextStyle}>
        You don’t have anything yet. {'\n'}Let’s make one so you in control.
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  TextStyle: {
    color: ColorsLegacy.gray,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CardYet;
