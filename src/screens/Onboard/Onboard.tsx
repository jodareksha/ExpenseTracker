import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import OnboardCostume from '../../components/CostumeOnboard/OnboardCostume';
import Legacy from '../../components/LegacyButton/Legacy';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../route/Appstack';
import {OnboardData} from '../../utils/enums/VariableData';

export type onBoardProps = {};

const Onboard: FC<NativeStackScreenProps<NavigatorParamList, 'Onboard'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.conWrap}>
        <OnboardCostume Data={OnboardData} />
        <View>
          <Legacy
            Title="Sign Up"
            StyleColor={ColorsLegacy.violet100}
            TextColor="white"
            onPressed={() => {
              navigation.navigate('Register', '');
            }}
          />
          <Legacy
            Title="Login"
            StyleColor={ColorsLegacy.violet20}
            TextColor={ColorsLegacy.violet100}
            onPressed={() => {
              navigation.navigate('Login', '');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  conWrap: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default Onboard;
