import React, {FC, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/MainScreen/Home';
import Profile from '../../screens/MainScreen/Profile';
import Transaction from '../../screens/MainScreen/Transaction';
import Budget from '../../screens/MainScreen/Budget';
import TabComponent from '../../components/TabComponent/TabComponent';
import style from './style';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import ButtonTabCostume from '../../components/TabComponent/ButtonTabCostume';
import {View} from 'react-native';
import CreateWaves from '../../components/ModalTabs/CreateWaves';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../Appstack';

export type TabNavParamList = {
  Home: undefined;
  Transaction: undefined;
  Budget: undefined;
  Plus: undefined;
  Profile: undefined;
  More: undefined;
  Report: undefined;
};

const Tab = createBottomTabNavigator<TabNavParamList>();

const BottomTabs: FC<
  NativeStackScreenProps<NavigatorParamList, 'BottomTabs'>
> = ({navigation}) => {
  const [click, setClick] = useState<boolean>(false);
  const openModal = () => {
    setClick(!click);
  };
  const closeModal = () => {
    setClick(false);
  };
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: route.name == 'More' ? '\u200B' : route.name,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: ColorsLegacy.gray,
          tabBarActiveTintColor: ColorsLegacy.violet100,
          tabBarLabelPosition: 'below-icon',
          tabBarShowLabel: false,
          tabBarStyle: style.containerBar,
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <TabComponent
                colors={color}
                activeImg={require('../../Image/bottomIcon/homeActive.png')}
                nonActive={require('../../Image/bottomIcon/home.png')}
                Label="Home"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={Transaction}
          options={{
            tabBarIcon: ({color, size}) => (
              <TabComponent
                colors={color}
                activeImg={require('../../Image/bottomIcon/TransActive.png')}
                nonActive={require('../../Image/bottomIcon/Trans.png')}
                Label="Transaction"
              />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <ButtonTabCostume
                focus={click}
                onPressed={openModal}
                Activeimg={require('../../Image/bottomIcon/close.png')}
                nonActive={require('../../Image/bottomIcon/plus.png')}
              />
            ),
            tabBarShowLabel: false,
          }}>
          {() => null}
        </Tab.Screen>

        <Tab.Screen
          name="Budget"
          component={Budget}
          options={{
            tabBarIcon: ({color, size}) => (
              <TabComponent
                colors={color}
                activeImg={require('../../Image/bottomIcon/PieActive.png')}
                nonActive={require('../../Image/bottomIcon/Pie.png')}
                Label="Budget"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <TabComponent
                colors={color}
                activeImg={require('../../Image/bottomIcon/userActive.png')}
                nonActive={require('../../Image/bottomIcon/user.png')}
                Label="Profile"
              />
            ),
          }}
        />
      </Tab.Navigator>
      <CreateWaves
        visible={click}
        onClose={closeModal}
        navigation={navigation}
      />
    </View>
  );
};

export default BottomTabs;
