import {View, Text, StyleSheet, Animated, ViewStyle} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';
import renderDot from './renderDot';

type DataItem = {
  value: number;
  color?: string;
  gradientCenterColor?: string;
  focused?: boolean;
  title?: string;
};

type ProgresProp = {
  data: DataItem[];
};

const Progress = ({data}: ProgresProp) => {
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    setTimeout(() => {
      animatedValues.forEach((animatedValue, index) => {
        Animated.timing(animatedValue, {
          toValue: data[index]?.value / 100,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      });
    }, 2000);
  }, [animatedValues, data]);

  return (
    <View style={style.renderDots}>
      {data.map((e: any, index: number) => {
        const animatedWidth = animatedValues[index]?.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        });
        return (
          <View key={index} style={style.container}>
            <View style={style.wrapCon}>
              <View style={style.conText}>
                {renderDot(e.color)}
                <Text style={style.textStyle}>{e.title}</Text>
              </View>
              <Text>{e.value} %</Text>
            </View>
            <View style={style.conAnimate}>
              <Animated.View
                style={getDynamicAnimated(e.color, animatedWidth)}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const getDynamicAnimated = (color: string, animatedWidth: any): ViewStyle => ({
  backgroundColor: color,
  width: animatedWidth,
  height: '100%',
  borderRadius: 10,
});
const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  wrapCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  conText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    borderColor: ColorsLegacy.gray,
    borderWidth: 0.5,
    backgroundColor: 'rgba(241, 241, 250, 1)',
  },
  conAnimate: {
    borderWidth: 1,
    borderColor: '#F1F1FA',
    backgroundColor: '#F1F1FA',
    width: '100%',
    height: DimenHeight(12),
    borderRadius: 10,
  },
  renderDots: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    color: ColorsLegacy.black,
    fontWeight: '500',
  },
});
export default Progress;
