import {View, StyleSheet} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import Progress from './Progress';

type DataItem = {
  value: number;
  color?: string;
  gradientCenterColor?: string;
  focused?: boolean;
  title?: string;
};

type RenderProps = {
  data: DataItem[];
};

const PieChartComponent = ({data}: RenderProps) => {
  const maxIndex = data.reduce((maxIdx, item, idx, arr) => {
    return item.value > arr[maxIdx].value ? idx : maxIdx;
  }, 0);

  const updatedPieData = data.map((item, index) => {
    if (index === maxIndex) {
      return {...item, focused: true};
    }
    return item;
  });

  return (
    <View style={style.container}>
      <View style={{alignItems: 'center'}}>
        <PieChart
          data={updatedPieData}
          strokeColor="white"
          strokeWidth={4}
          isAnimated={true}
          innerCircleBorderWidth={4}
          innerCircleBorderColor={'white'}
          donut
          sectionAutoFocus
          textColor="black"
          radius={DimenHeight(85)}
          innerRadius={DimenHeight(45)}
          innerCircleColor={'#232B5D'}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
  },
  conInner: {justifyContent: 'center', alignItems: 'center'},
  textValues: {fontSize: 22, color: 'white', fontWeight: 'bold'},
  Tittles: {fontSize: 14, color: 'white'},
});
export default PieChartComponent;
