import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import Dotsyle from './DotStyle/Dotsyle';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';

type onBoardsProps = {
  Data: any;
};

type renderProps = {
  item: any;
  index: number;
};

const OnboardCostume = ({Data}: onBoardsProps) => {
  const ref = useRef(null);
  const [localIndex, setLocalIndex] = useState(0);
  const onSwap = React.useRef((x: any) => {
    setLocalIndex(x?.changed[0]?.index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 55});

  const renderItems = ({item, index}: renderProps) => {
    return (
      <View key={index.toString()} style={getDynamicStyles(localIndex)}>
        <Image source={item?.image} style={style.img} />
        <View>
          <Text style={style.titleText}>{item?.title}</Text>
          <Text style={style.subsText}>{item?.subs}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={Data}
        renderItem={renderItems}
        ref={ref}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onSwap?.current}
        viewabilityConfig={viewConfigRef?.current}
      />
      <Dotsyle index={localIndex} data={Data} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    alignItems: 'center',
    backgroundColor: ColorsLegacy.white,
  },
  img: {
    height: DimenHeight(312),
    width: DimenWidth(312),
    resizeMode: 'contain',
  },
  titleText: {
    textAlign: 'center',
    fontSize: DimenHeight(32),
    fontWeight: '700',
    color: ColorsLegacy.black,
  },
  subsText: {
    paddingTop: 10,
    textAlign: 'center',
    color: ColorsLegacy.gray,
    fontSize: DimenHeight(16),
    fontWeight: '500',
  },
  conDot: {
    marginTop: 10,
  },
});

const getDynamicStyles = (localIndex: number) => ({
  marginBottom: DimenHeight(25),
  width: Dimensions.get('window').width - 62,
  marginVertical: DimenHeight(8),
  marginHorizontal:
    localIndex % 2 === 0
      ? DimenWidth(16)
      : Platform.OS === 'ios'
      ? Dimensions.get('window').width > 350
        ? undefined
        : DimenWidth(18)
      : DimenWidth(18),
  marginLeft:
    localIndex % 2 === 0
      ? DimenWidth(16)
      : Platform.OS === 'ios'
      ? DimenWidth(28)
      : DimenWidth(16),
});

export default OnboardCostume;
