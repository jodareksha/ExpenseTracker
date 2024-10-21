import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React, {useContext} from 'react';
import Legacy from '../../components/LegacyButton/Legacy';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {UseContext} from '../../context/Context';
import {TabNavParamList} from '../../route/BottomTabs/BottomTab';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const Profile: React.FC<NativeStackScreenProps<TabNavParamList, 'Profile'>> = ({
  navigation,
}) => {
  const {logoutUser, user} = useContext(UseContext);

  console.log(user, 'user');
  const handleNav = () => {
    logoutUser();
    navigation.replace('Login' as never, '' as never);
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.wrap}>
        <View style={style.bigCon}>
          <View style={style.imageCon}>
            <Image source={require('../../Image/bottomIcon/user.png')} />
          </View>
          <View style={style.txtCon}>
            <Text>Username</Text>
            <Text>{user.name}</Text>
          </View>
        </View>
        <Text>Progress Fitur</Text>
        <View style={style.buttCon}>
          <Legacy
            Title="Logout"
            StyleColor={ColorsLegacy.violet100}
            TextColor={ColorsLegacy.white}
            onPressed={handleNav}
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
  wrap: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bigCon: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  imageCon: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: ColorsLegacy.violet100,
    height: DimenHeight(80),
    width: DimenWidth(80),
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCon: {
    height: DimenHeight(50),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '50%',
    marginHorizontal: 10,
  },
  buttCon: {flex: 1, justifyContent: 'center'},
});

export default Profile;
