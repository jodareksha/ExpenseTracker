import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {DimenHeight} from '../../utils/Dimensions';

type Legacytype = {
  Title: string;
  TextColor?: string;
  StyleColor?: string;
  onPressed: () => void;
};

const Legacy = ({
  Title,
  TextColor = 'black',
  StyleColor = 'white',
  onPressed,
}: Legacytype) => {
  return (
    <TouchableOpacity
      style={[style.container, {backgroundColor: StyleColor}]}
      onPress={onPressed}>
      <Text style={[style.textStyles, {color: TextColor}]}>{Title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: DimenHeight(56),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: DimenHeight(10),
  },
  textStyles: {
    fontSize: DimenHeight(18),
    fontWeight: '600',
  },
});

export default Legacy;
