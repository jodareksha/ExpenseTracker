import {View, Text} from 'react-native';
import React from 'react';
import {LineChart, LineChartBicolor} from 'react-native-gifted-charts';
import {DimenHeight} from '../../utils/Dimensions';

type dataProps = {
  value: any;
  dataPointText: any;
};
type CurveProp = {
  data: dataProps[];
};
const CurvedChart = ({data}: CurveProp) => {
  enum CurveType {
    CUBIC,
    QUADRATIC,
  }

  return (
    <View style={{}}>
      {data?.length > 0 ? (
        <LineChart
          data={data}
          curved
          curveType={CurveType.QUADRATIC}
          adjustToWidth
          areaChart
          hideDataPoints
          hideYAxisText
          hideAxesAndRules
          isAnimated={true}
          thickness={8}
          color="rgba(127, 61, 255, 1)"
          startFillColor={'rgba(139, 80, 255, 0.24)'}
          initialSpacing={-15}
          maxValue={200}
        />
      ) : (
        <Text style={{textAlign: 'center'}}>No data available</Text>
      )}
    </View>
  );
};

export default CurvedChart;
