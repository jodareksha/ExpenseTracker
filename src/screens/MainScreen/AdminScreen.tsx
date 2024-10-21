import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  ViewStyle,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UseContext} from '../../context/Context';
import Legacy from '../../components/LegacyButton/Legacy';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {deleteExpense} from '../../services/NewDatabase';

type renderProps = {
  item: any;
  index: number;
};
const AdminScreen = ({navigation}) => {
  const context = useContext(UseContext);
  const [onChanges, setOnChanges] = useState(false);
  const {adminData, fetchAdminScreen, logoutUser, user, categoryBreakdown} =
    context;

  const handleNav = () => {
    logoutUser();
    navigation.replace('Login' as never, '' as never);
  };
  useEffect(() => {
    fetchAdminScreen();
  }, [onChanges]);

  const shopping = require('../../Image/icon/shopping.png');
  const sub = require('../../Image/icon/bill.png');
  const food = require('../../Image/icon/fork.png');
  const money = require('../../Image/icon/salary.png');
  const car = require('../../Image/icon/car.png');

  const HandleDelete = async (id: number, userId: number, admin: boolean) => {
    await deleteExpense(id, userId, admin);
    setOnChanges(!onChanges);
  };

  const _renderItem = ({item, index}: renderProps) => {
    const image =
      item.category == 'Shopping'
        ? shopping
        : item.category == 'Subscription'
        ? sub
        : item.category == 'Food'
        ? food
        : item.category == 'Salary' || item.category == 'Passive Income'
        ? money
        : car;
    const onColor =
      item.category == 'Shopping'
        ? 'rgba(252, 238, 212, 1)'
        : item.category == 'Subscription'
        ? 'rgba(238, 229, 255, 1)'
        : item.category == 'Food'
        ? 'rgba(253, 213, 215, 1)'
        : item.category == 'Salary' || item.category == 'Passive Income'
        ? 'rgba(207, 250, 234, 1)'
        : 'rgba(189, 220, 255, 1)';

    return (
      <View key={index} style={style.itemcon}>
        <View style={getDynamicContainerImage(onColor)}>
          <Image source={image} style={style.imgCon} />
        </View>
        <View>
          <Text style={style.textStyle}>NAME: {item.userName}</Text>
          <Text style={style.desx}>Catergory: {item.category}</Text>
          <Text style={style.desx}>Desc: {item.desc}</Text>
          <Text style={style.desx}>Date :{item.time}</Text>
        </View>
        <View>
          <Pressable
            style={style.buttons}
            onPress={() => {
              HandleDelete(item.id, item.userId, true);
            }}>
            <Text style={{color: 'white'}}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={style.con}>
      <View style={style.bigcon}>
        <View>
          <Pressable
            style={style.reportStyle}
            onPress={() => {
              navigation.navigate('Report');
            }}>
            <Text style={style.labelFinance}>See your financial report</Text>
            <Text style={style.seeAll}>See All</Text>
          </Pressable>
        </View>
        <View style={{height: '70%'}}>
          <FlatList
            data={adminData}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={style.log}>
          <Legacy
            Title="Logout"
            StyleColor={ColorsLegacy.red100}
            TextColor={ColorsLegacy.white}
            onPressed={handleNav}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const getDynamicContainerImage = (x: string): ViewStyle => ({
  backgroundColor: x,
  height: DimenHeight(60),
  width: DimenWidth(60),
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
});

const style = StyleSheet.create({
  con: {flex: 1, backgroundColor: 'white'},
  bigcon: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  reportStyle: {
    backgroundColor: 'rgba(238, 229, 255, 1)',
    borderColor: 'rgba(127, 61, 255, 1)',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
  },
  labelFinance: {color: 'rgba(127, 61, 255, 1)'},
  seeAll: {
    textDecorationLine: 'underline',
    color: 'rgba(127, 61, 255, 1)',
  },
  imgCon: {
    resizeMode: 'contain',
    height: DimenHeight(30),
    width: DimenWidth(30),
  },
  textStyle: {
    fontSize: DimenHeight(16),
    fontWeight: '500',
    color: 'black',
  },
  desx: {
    fontSize: DimenHeight(13),
    fontWeight: '500',
    color: 'rgba(145, 145, 159, 1)',
  },
  buttons: {backgroundColor: 'red', padding: 10, borderRadius: 10},
  log: {height: '20%', justifyContent: 'flex-end'},
  itemcon: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: ColorsLegacy.gray,
  },
});
export default AdminScreen;
