import {View, StyleSheet} from 'react-native';
import React from 'react';
import {DimenHeight, DimenWidth} from '../../../utils/Dimensions';
import {ColorsLegacy} from '../../LegacyColors/LegacyColors';

type dotProps = {
  index: number;
  data: any;
};

const Dotsyle = ({index = 0, data}: dotProps) => {
  return (
    <View style={styles.dotIndicatorContainer}>
      {data?.map(
        (point: any, pointIndex: never) =>
          ![].includes(pointIndex) && (
            <View
              key={pointIndex}
              style={[
                styles.dotIndicatorItem,
                pointIndex === index && styles.dotIndicatorItemActive,
              ]}
            />
          ),
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  dotIndicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: DimenHeight(8),
  },
  dotIndicatorItem: {
    marginHorizontal: DimenWidth(8),
    borderRadius: 8,
    width: DimenWidth(8),
    height: DimenHeight(8),
    backgroundColor: ColorsLegacy.gray,
  },
  dotIndicatorItemActive: {
    width: DimenWidth(16),
    height: DimenHeight(16),
    backgroundColor: ColorsLegacy.violet100,
  },
});

export default Dotsyle;
