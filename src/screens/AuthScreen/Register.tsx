import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {FC, useContext, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../route/Appstack';
import CostumeInput from '../../components/LegacyInput/CostumeInput';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {DimenHeight} from '../../utils/Dimensions';
import Legacy from '../../components/LegacyButton/Legacy';
import Selected from '../../components/DropDown/Selected';
import {addUser, loginUser} from '../../services/NewDatabase';
import HandlerWarning from '../../components/HandleAlert/HandleAlert';
import {UseContext} from '../../context/Context';

export type RegiterProps = {};

const Register: FC<NativeStackScreenProps<NavigatorParamList, 'Register'>> = ({
  navigation,
}) => {
  const context = useContext(UseContext);
  const {loginUsers} = context;

  const [Name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const HandleButton = async () => {
    await addUser(Name, role, password)
      .then(e => {
        handleLogin();
      })
      .catch(e => {
        HandlerWarning('Fail', `${e}`, undefined);
      });
  };

  const handleLogin = async () => {
    try {
      const data = await loginUsers(Name, password);
      HandleNav(data);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleNav = (oaut: any) => {
    if (oaut.role == 'user') {
      navigation.replace('NewUser');
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
          <Text style={style.banners}>Create New Account</Text>
          <View style={style.conInput}>
            <CostumeInput
              placehold="Name"
              onChanges={(e: string) => {
                setName(e);
              }}
            />
            <Selected
              data={[
                {category: 'admin', value: 'admin'},
                {category: 'user', value: 'user'},
              ]}
              holder="Role"
              onSelected={(e: any) => {
                setRole(e.category);
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
              Title="Sign Up"
              TextColor={ColorsLegacy.white}
              StyleColor={ColorsLegacy.violet100}
              onPressed={HandleButton}
            />
          </View>
          <View style={style.conText}>
            <Text style={style.TextStyle}>Already have an account? </Text>
            <Text
              onPress={() => {
                navigation.navigate('Login' as never);
              }}
              style={style.TextStyle2}>
              Login
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
  conInput: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: DimenHeight(200),
  },
  conWrap: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
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
export default Register;
