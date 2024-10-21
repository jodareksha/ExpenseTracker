import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';

type swiperProps = {
  onPressed: (itemId: number) => void;
  data: dataItems[];
  ActiveColor?: string;
  DeActColor?: string;
  StyleTextColor?: string;
};

type dataItems = {
  id: number;
  label: string;
};

const Swipper = ({
  data,
  onPressed,
  ActiveColor = 'rgba(252, 238, 212, 1)',
  StyleTextColor = 'rgba(252, 172, 18, 1)',
  DeActColor,
}: swiperProps) => {
  const [change, setChange] = useState<number>(1);
  useEffect(() => {
    onPressed;
    change;
    clickHappens;
  }, [change, onPressed]);

  const clickHappens = (itemId: number) => () => {
    setChange(currentItem => (currentItem === itemId ? currentItem : itemId));
    onPressed(itemId);
  };

  return (
    <View style={style.container}>
      {data.map((data, index) => {
        return (
          <Pressable
            key={index.toLocaleString()}
            onPress={clickHappens(data.id)}
            style={conButtonChange(change, data.id, ActiveColor, DeActColor)}>
            <Text style={textStyleChange(change, data.id, StyleTextColor)}>
              {data.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const conButtonChange = (
  x: number,
  y: number,
  active: any,
  dec: any,
): ViewStyle => ({
  backgroundColor: x == y ? active : undefined,
  //   width: DimenWidth(85),
  width: '50%',
  alignItems: 'center',
  padding: 10,
  borderRadius: 20,
});

const textStyleChange = (x: number, y: number, color: string): TextStyle => ({
  color: x == y ? color : ColorsLegacy.gray,
  fontWeight: x == y ? '700' : undefined,
});

export default Swipper;
