import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen, {SplashProps} from '../screens/SplashScreen/SplashScreen';
import Onboard, {onBoardProps} from '../screens/Onboard/Onboard';
import BottomTabs from './BottomTabs/BottomTab';
import Login, {LoginProps} from '../screens/AuthScreen/Login';
import Register, {RegiterProps} from '../screens/AuthScreen/Register';
import FinanceReport from '../screens/MainScreen/DetailScreen/FinanceReport';
import IncomeScreen from '../screens/MainScreen/CreateScreen/IncomeScreen';
import ExpenseScreen from '../screens/MainScreen/CreateScreen/ExpenseScreen';
import {ColorsLegacy} from '../components/LegacyColors/LegacyColors';
import AddNew from '../screens/MainScreen/AddNew/AddNew';
import ExhangeRate from '../screens/MainScreen/CreateScreen/ExhangeRate';
import AdminScreen from '../screens/MainScreen/AdminScreen';

export type NavigatorParamList = {
  SplashScreen: SplashProps;
  Onboard: onBoardProps;
  Login: LoginProps;
  Register: RegiterProps;
  BottomTabs: undefined;
  Report: undefined;
  Expense: undefined;
  Income: undefined;
  NewUser: undefined;
  Exchange: undefined;
  AdminScreen: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

function Appstack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Sign Up',
          }}
        />
        <Stack.Screen
          name="NewUser"
          component={AddNew}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Add New Account',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: ColorsLegacy.violet100,
            },
          }}
        />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen
          name="Report"
          component={FinanceReport}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Financial Report',
          }}
        />
        <Stack.Screen
          name="Expense"
          component={ExpenseScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Expense',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: ColorsLegacy.red100,
            },
          }}
        />
        <Stack.Screen
          name="Income"
          component={IncomeScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Income',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: ColorsLegacy.green,
            },
          }}
        />
        <Stack.Screen
          name="Exchange"
          component={ExhangeRate}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitle: 'Exchange Rate',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: ColorsLegacy.blue,
            },
          }}
        />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Appstack;
