import {View, Text} from 'react-native';
import React from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';

const renderDot = (color: string) => {
  return (
    <View
      style={{
        height: DimenHeight(10),
        width: DimenWidth(10),
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

export default renderDot;
