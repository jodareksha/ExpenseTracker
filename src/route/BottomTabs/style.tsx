import {Platform, StyleSheet} from 'react-native';
import {DimenHeight} from '../../utils/Dimensions';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';

const style = StyleSheet.create({
  containerBar: {
    height: Platform.OS == 'ios' ? DimenHeight(90) : DimenHeight(80),
    shadowColor: ColorsLegacy.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
  },
});

export default style;
