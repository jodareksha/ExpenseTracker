import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';

type WavesProps = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

const CreateWaves = ({visible, onClose, navigation}: WavesProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <SafeAreaView style={style.container}>
        <View style={style.conWrapTopButton}>
          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate('Exchange');
            }}
            style={[style.circles, {backgroundColor: ColorsLegacy.blue}]}>
            <Image
              source={require('../../Image/bottomIcon/exchange.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={style.conCircles}>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('Income');
              }}
              style={[style.circles, {backgroundColor: ColorsLegacy.green}]}>
              <Image
                source={require('../../Image/bottomIcon/income.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('Expense');
              }}
              style={[style.circles, {backgroundColor: ColorsLegacy.red100}]}>
              <Image
                source={require('../../Image/bottomIcon/Expense.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.conWrapButton}>
          <Pressable style={style.ButtonStyle} onPress={onClose}>
            <Text>{'   '}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(139, 80, 255, 0.11)',
    height: Platform.OS == 'ios' ? '89%' : '90%',
  },
  conWrapTopButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: DimenHeight(60),
  },
  conWrapButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    top: DimenHeight(60),
  },
  ButtonStyle: {
    height: DimenHeight(80),
    width: DimenWidth(60),
  },
  conCircles: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circles: {
    height: DimenHeight(57),
    width: DimenWidth(57),
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: ColorsLegacy.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
export default CreateWaves;
