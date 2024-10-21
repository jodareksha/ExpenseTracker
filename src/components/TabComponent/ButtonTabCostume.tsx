import {
  View,
  Image,
  Platform,
  ViewStyle,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';

type TabProps = {
  focus: boolean;
  Activeimg: any;
  nonActive: any;
  onPressed: () => void;
};

const ButtonTabCostume = ({
  focus,
  Activeimg,
  nonActive,
  onPressed,
}: TabProps) => {
  const switchs = focus ? Activeimg : nonActive;
  return (
    <Pressable style={style.containerWrap} onPress={onPressed}>
      <View style={style.container}>
        <Image source={switchs} style={style.img} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: ColorsLegacy.violet100,
    height: DimenHeight(57),
    width: DimenWidth(57),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    elevation: 2,
    shadowColor: ColorsLegacy.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  img: {
    resizeMode: 'contain',
    height: DimenHeight(25),
    width: DimenWidth(25),
  },
  containerWrap: {
    height: DimenHeight(75),
    width: DimenWidth(75),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: Platform.OS == 'ios' ? DimenHeight(5) : DimenHeight(25),
  },
});
export default ButtonTabCostume;
