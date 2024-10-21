import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {FC, useContext, useEffect} from 'react';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../route/Appstack';
import {
  createExpensesTable,
  createTablesIncome,
  createUsersTable,
} from '../../services/NewDatabase';
import {UseContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SplashProps = {};

const SplashScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'SplashScreen'>
> = ({navigation}) => {
  const initDB = async () => {
    await createUsersTable();
    await createExpensesTable();
    await createTablesIncome();
    const users = await AsyncStorage.getItem('user');
    setTimeout(() => {
      handleNavigation(JSON?.parse(users));
    }, 2000);
  };

  const handleNavigation = (user: any) => {
    if (user?.role == 'user') {
      navigation.replace('BottomTabs');
    } else if (user?.role == 'admin') {
      navigation.replace('AdminScreen');
    } else {
      navigation.replace('Onboard', '');
    }
  };
  useEffect(() => {
    initDB();
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.conWrap}>
        <Image
          source={require('../../Image/icon/Ellipse.png')}
          style={style.ImageWrap}
        />
        <Text style={style.TextBanner}>Expense</Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLegacy.violet100,
  },
  conWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextBanner: {
    color: ColorsLegacy.white,
    fontSize: DimenHeight(56),
    fontWeight: '700',
    fontStyle: 'italic',
  },
  ImageWrap: {
    height: DimenHeight(84),
    width: DimenWidth(84),
    resizeMode: 'cover',
    position: 'absolute',
    left: 80,
  },
});

export default SplashScreen;
