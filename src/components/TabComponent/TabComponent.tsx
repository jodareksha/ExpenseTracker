import {View, Text, Image, StyleSheet, TextStyle, Platform} from 'react-native';
import React from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';

type TabProps = {
  colors: any;
  activeImg: any;
  nonActive: any;
  Label: string;
};

const TabComponent = ({colors, activeImg, nonActive, Label}: TabProps) => {
  const switchs = colors == '#7F3DFF' ? activeImg : nonActive;
  return (
    <View style={style.container}>
      <Image source={switchs} style={style.imageStyle} />
      <Text style={TextTintColor(colors)}>{Label}</Text>
    </View>
  );
};

const TextTintColor = (colors: any): TextStyle => ({
  fontSize: DimenHeight(10),
  color: colors,
  textAlign: 'center',
  fontWeight: '500',
  marginVertical: 5,
});

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? DimenHeight(15) : undefined,
  },
  imageStyle: {
    height: DimenHeight(24),
    width: DimenWidth(24),
    resizeMode: 'contain',
  },
});

export default TabComponent;
