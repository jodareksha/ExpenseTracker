import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {FC, useContext, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../route/Appstack';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import CostumeInput from '../../components/LegacyInput/CostumeInput';
import {DimenHeight} from '../../utils/Dimensions';
import Legacy from '../../components/LegacyButton/Legacy';
import {loginUser} from '../../services/NewDatabase';
import HandlerWarning from '../../components/HandleAlert/HandleAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UseContext} from '../../context/Context';

export type LoginProps = {};

const Login: FC<NativeStackScreenProps<NavigatorParamList, 'Login'>> = ({
  navigation,
}) => {
  const context = useContext(UseContext);
  const {loginUsers} = context;

  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const data = await loginUsers(Name, password);
      HandleNav(data);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const HandleNav = (oaut: any) => {
    console.log(oaut, 'cek');
    if (oaut.role == 'user') {
      navigation.replace('BottomTabs');
    } else {
      navigation.replace('AdminScreen');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <SafeAreaView style={style.container}>
        <View style={style.conWrap}>
          <Text style={style.banners}>Welcome !</Text>
          <View style={style.conInput}>
            <CostumeInput
              placehold="Name"
              onChanges={(e: string) => {
                setName(e);
              }}
            />
            <CostumeInput
              Password={true}
              placehold="Password"
              onChanges={(e: string) => {
                setPassword(e);
              }}
            />
          </View>
          <View>
            <Legacy
              Title="Login"
              TextColor={ColorsLegacy.white}
              StyleColor={ColorsLegacy.violet100}
              onPressed={handleLogin}
            />
          </View>
          <View style={style.conText}>
            <Text style={style.TextStyle}>Don’t have an account yet? </Text>
            <Text
              onPress={() => {
                navigation.navigate('Register' as never);
              }}
              style={style.TextStyle2}>
              Sign Up
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLegacy.white,
  },
  banners: {
    textAlign: 'center',
    fontSize: DimenHeight(26),
    fontWeight: '700',
    color: ColorsLegacy.black,
  },
  conWrap: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  conInput: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: DimenHeight(130),
  },
  conText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    color: ColorsLegacy.gray,
    fontSize: 15,
    fontWeight: '500',
  },
  TextStyle2: {
    color: ColorsLegacy.violet100,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
export default Login;
