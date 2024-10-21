import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';

type InputCashProps = {
  onChanges: any;
  label?: string;
};

const CostumeInputCash = ({onChanges, label = 'How much?'}: InputCashProps) => {
  return (
    <View style={style.container}>
      <Text style={style.txtStyle}>{label}</Text>
      <TextInput
        placeholder="$0"
        placeholderTextColor={'white'}
        keyboardType="number-pad"
        style={style.inputs}
        onChangeText={e => {
          onChanges(e);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  inputs: {
    fontSize: DimenHeight(64),
    color: 'rgba(252, 252, 252, 1)',
    fontWeight: '600',
  },
  txtStyle: {
    fontWeight: '600',
    fontSize: DimenWidth(16),
    color: '#FCFCFC',
  },
});

export default CostumeInputCash;
